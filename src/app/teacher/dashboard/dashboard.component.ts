import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/shared/services/subject.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  subjects: any;
  loginTeacher: any;
  myStudents: any;
  allStudent: any;
  constructor(private sbs: SubjectService, private as: AuthService) {}

  ngOnInit(): void {
    this.myStudents = [];
    this.getLoginStudent();
    this.getAllStudents();
  }

  getLoginStudent() {
    this.as.getLoginUser().subscribe((res) => {
      this.as.user.next(res);
      this.loginTeacher = res;
      this.getTeacherSubjects();
    });
  }

  getTeacherSubjects() {
    this.sbs.getSubjects().subscribe((res: any) => {
      this.subjects = res.filter(
        (subject: any) => subject.teacherId === this.loginTeacher.userId
      );
      this.getMyStudent();
    });
  }

  getAllStudents() {
    this.as.GetStudents().subscribe((res) => {
      this.allStudent = res;
    });
  }

  getMyStudent() {
    this.allStudent?.map((student: any) => {
      student.subjects.map((subject: any) => {
        this.subjects.map((sub: any) => {
          if (subject.subjectName === sub.subjectName) {
            const model = {
              name: student.name,
              subjects: student.subjects,
            };
            this.myStudents.push(model);
          }
        });
      });
    });

    // remove Duplicated Items
    for (let a = 0; a < this.myStudents.length; a++) {
      for (let b = a + 1; b < this.myStudents.length; b++) {
        if (this.myStudents[b].name === this.myStudents[a].name) {
          this.myStudents.splice(a, 1);
        }
      }
    }
  }
}
