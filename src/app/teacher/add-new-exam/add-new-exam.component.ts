import { AuthService } from './../../shared/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { SubjectService } from 'src/app/shared/services/subject.service';

@Component({
  selector: 'app-add-new-exam',
  templateUrl: './add-new-exam.component.html',
  styleUrls: ['./add-new-exam.component.css'],
})
export class AddNewExamComponent implements OnInit {
  @ViewChild('stepper') stepper: any;
  subjectName: string;
  subjectControl!: FormControl;
  question!: FormGroup;
  questions: any[];
  loginUserData: any;
  allSubjects: any;
  lang: any;
  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    private sbs: SubjectService,
    private router: Router,
    private as: AuthService
  ) {
    this.subjectName = '';
    this.questions = [];
  }
  ngOnInit(): void {
    this.createForms();
    this.as.getLoginUser().subscribe((res) => {
      this.loginUserData = res;
    });

    if (localStorage.getItem('lang')) {
      this.lang = localStorage.getItem('lang');
    } else {
      this.lang = 'AR';
    }
  }

  getAllSubjects() {
    this.sbs.getSubjects().subscribe((res: any) => {
      this.allSubjects = res;
    });
  }

  createForms() {
    this.subjectControl = this.fb.control('', [
      Validators.required,
      Validators.maxLength(12),
    ]);
    this.question = this.fb.group({
      title: ['', Validators.required],
      answer1: ['', Validators.required],
      answer2: ['', Validators.required],
      answer3: ['', Validators.required],
      answer4: ['', Validators.required],
      correctAnswer: ['', Validators.required],
    });
  }

  setSubject() {
    this.subjectName = this.subjectControl.value;
  }

  // get all subject and check subject name added before
  checkExistingSubject(btn: any) {
    this.getAllSubjects();
    let Index = this.allSubjects?.findIndex(
      (subject: any) => subject.subjectName === this.subjectControl.value
    );
    if (Index != -1 && Index != undefined) {
      this.toast.error('This Subject Name Is Added Before!');
      btn._disabled = true;
      this.subjectControl.setErrors({ exist: true });
    } else {
      btn._disabled = false;
    }
  }

  saveQuestion() {
    let data = this.question.value;
    if (data) {
      this.questions.push(data);
      this.question.reset();
      this.toast.success('Question Added Successfully', 'Question State');
    }
  }
  questionReset() {
    this.question.reset();
  }
  deleteQuestion(index: number) {
    this.questions.splice(index, 1);
    this.toast.success('Deleted Successfully', 'Delete Question');
  }

  addSubject() {
    let model = {
      teacherId: this.loginUserData.userId,
      subjectName: this.subjectName,
      questions: this.questions,
    };
    this.sbs.addNewSubject(model).subscribe((res) => {
      this.toast.success('Subject Added Successfully', 'Subject State');
      this.router.navigate(['teacher/subjects']);
    });
  }
}
