import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/shared/services/subject.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  teacherInfo: any;

  allStudent: any;

  allSubjects: any;

  TeacherSubjects: any;

  students: any;

  filterStudent: any[] = [];
  constructor(private as: AuthService, private sbs: SubjectService) {}

  ngOnInit(): void {
    this.students = [];
    this.getTeacherInfo();
    this.getAllStudents();
  }

  getTeacherInfo() {
    this.as.getLoginUser().subscribe((res: any) => {
      this.teacherInfo = res;

      this.getAllSubjectsForTeacher(this.teacherInfo?.userId);
    });
  }
  getAllStudents() {
    this.as.GetStudents().subscribe((res: any) => {
      this.allStudent = res;
    });
  }

  getAllSubjectsForTeacher(teacherId: number) {
    this.sbs.getSubjects().subscribe((res) => {
      this.allSubjects = res;
      this.TeacherSubjects = this.allSubjects?.filter(
        (subject: any) => subject.teacherId === teacherId
      );
      this.filterStudentGetTeacherExams();
    });
  }

  // filterStudentGetTeacherExams() {
  //   let subjects: any[] = [];
  //   this.allStudent.map((student: any) => {
  //     student.subjects.map((subject: any) => {
  //       this.TeacherSubjects.map((sub: any) => {
  //         if (subject.subjectName === sub.subjectName) {
  //           subjects.push(subject);
  //           const model = {
  //             name: student.name,
  //             subjects: subjects,
  //           };
  //           this.students.push(model);
  //         }
  //       });
  //     });
  //   });
  //   console.log(this.students);

  //   this.filterStudent = this.students;
  // }

  filterStudents(value: string) {
    if (value != '' && value != null) {
      let results = this.students.filter(
        (s: any) => s.name.toLowerCase().match(value) || s.name.match(value)
      );
      this.filterStudent = results;
    } else {
      this.filterStudent = this.students;
    }
  }

  filterStudentGetTeacherExams() {
    this.allStudent.map((student: any) => {
      let subjects: any[] = [];
      student.subjects.map((subject: any) => {
        this.TeacherSubjects.map((sub: any) => {
          if (subject.subjectName === sub.subjectName) {
            subjects.push(subject);
            const model = {
              name: student.name,
              subjects: subjects,
            };
            this.students.push(model);
          }
        });
      });
    });

    // remove Duplicated Items
    for (let a = 0; a < this.students.length; a++) {
      for (let b = a + 1; b < this.students.length; b++) {
        if (this.students[b].name === this.students[a].name) {
          this.students.splice(a, 1);
        }
      }
    }

    this.filterStudent = this.students;
  }
}
