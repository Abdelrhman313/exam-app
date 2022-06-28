import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../shared/services/auth.service';
import { SubjectService } from 'src/app/shared/services/subject.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-show-exam',
  templateUrl: './show-exam.component.html',
  styleUrls: ['./show-exam.component.css'],
})
export class ShowExamComponent implements OnInit {
  examId: number;
  exam: any;

  loginUser: any;

  openModel: boolean;

  selectedQuestion: any;
  selectedQuestionId: any;

  score: number;
  totalGrade: number;
  mark: string;
  showGrade: boolean;

  studentData: any;
  studentSubject: any[];

  validExam: boolean;

  lang: any;
  constructor(
    private ar: ActivatedRoute,
    private sbs: SubjectService,
    private as: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.examId = this.ar.snapshot.params['id'];
    this.openModel = false;
    this.score = 0;
    this.totalGrade = 0;
    this.mark = '';
    this.showGrade = false;
    this.studentSubject = [];
    this.validExam = true;
  }

  ngOnInit(): void {
    this.getExam();

    this.as.getLoginUser().subscribe((res) => {
      this.loginUser = res;
      this.GetStudentInfo();
    });
    if (localStorage.getItem('lang')) {
      this.lang = localStorage.getItem('lang');
    } else {
      this.lang = 'AR';
    }
    this.as.lang.subscribe((res) => {
      if (res) {
        this.lang = res;
      }
    });
  }

  // Get Student Info
  GetStudentInfo() {
    this.as.getStudent(this.loginUser?.userId).subscribe((res: any) => {
      this.studentData = res;
      this.studentSubject = res?.subjects ? res?.subjects : [];
      this.checkValidExam();
    });
  }

  // Check Valid Exam
  checkValidExam() {
    for (let i in this.studentSubject) {
      if (this.studentSubject[i].subjectId === this.examId) {
        this.validExam = false;
        this.totalGrade = this.studentSubject[i].grade;
        this.mark = this.studentSubject[i].mark;
        this.showGrade = true;
      }
    }
  }

  //Get Correct Answer
  getCorrectAnswer(event: any) {
    let studentAnswer = event.value,
      questionIndex = +event.source.name;
    this.exam.questions[questionIndex].studentAnswer = studentAnswer;
  }

  // Get Result and Update Student Data
  getResult() {
    this.score = 0;
    for (let i = 0; i < this.exam.questions.length; i++) {
      if (
        this.exam.questions[i].correctAnswer ===
        this.exam.questions[i]?.studentAnswer
      ) {
        this.score++;
      }
    }
    this.showGrade = true;
    this.totalGrade = (this.score * 5) / (this.exam.questions.length * 5);

    switch (true) {
      case this.totalGrade < 0.5:
        this.mark = 'Fail';
        break;
      case 0.5 <= this.totalGrade && this.totalGrade <= 0.64:
        this.mark = 'Pass';
        break;
      case 0.65 <= this.totalGrade && this.totalGrade <= 0.74:
        this.mark = 'Good';
        break;
      case 0.75 <= this.totalGrade && this.totalGrade <= 0.84:
        this.mark = 'Very Good';
        break;
      case 0.85 <= this.totalGrade && this.totalGrade <= 0.94:
        this.mark = 'Excellent';
        break;
      case 0.95 <= this.totalGrade:
        this.mark = 'Distinct';
        break;
    }

    // Update Student Data
    this.studentSubject.push({
      subjectName: this.exam.subjectName,
      subjectId: this.examId,
      grade: this.totalGrade,
      mark: this.mark,
    });
    const model = {
      name: this.studentData?.name,
      email: this.studentData?.email,
      password: this.studentData?.password,
      subjects: this.studentSubject,
    };

    this.as.updateStudent(this.loginUser.userId, model).subscribe((res) => {
      this.toastr.success('Result Saved Successfully');
      setTimeout(() => {
        this.router.navigate(['student/grades']);
      }, 3000);
    });
  }

  // Get Current Question Values To Edit
  getEditQuestion(index: any) {
    this.selectedQuestionId = index;
    this.selectedQuestion = this.exam.questions[this.selectedQuestionId];
  }

  // Get New Values Of Question and Update DB
  saveEditQuestion(data: any) {
    this.exam.questions[this.selectedQuestionId] = data;
    let newDate = {
      teacherId: this.loginUser.userId,
      subjectName: this.exam.subjectName,
      questions: this.exam.questions,
    };
    this.sbs.editQuestions(this.examId, newDate).subscribe((res) => {
      this.openModel = false;
      this.toastr.success('Question Edit Successfully');
    });
  }

  // Get Current Exam To Display it
  getExam() {
    this.sbs.getExam(this.examId).subscribe((res) => {
      this.exam = res;
    });
  }

  // Delete Question from Exam
  deleteQuestion(index: number) {
    this.exam.questions.splice(index, 1);
    let newData = {
      subjectName: this.exam.subjectName,
      questions: this.exam.questions,
    };
    this.sbs.deleteQuestions(this.examId, newData).subscribe((res) => {
      this.toastr.success('Question Deleted Successfully');
    });
  }
}
