import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SubjectService } from 'src/app/shared/services/subject.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  subjects: any;
  loginStudent: any;
  studentInfo: any;
  constructor(
    private sbs: SubjectService,
    private as: AuthService,
    public ts: TranslateModule
  ) {}

  ngOnInit(): void {
    this.getAllSubjects();
    this.getLoginStudent();
  }

  getAllSubjects() {
    this.sbs.getSubjects().subscribe((res) => {
      this.subjects = res;
    });
  }

  getLoginStudent() {
    this.as.getLoginUser().subscribe((res) => {
      this.as.user.next(res);
      this.loginStudent = res;
      this.getStudentInfo();
    });
  }

  getStudentInfo() {
    this.as.getStudent(this.loginStudent.userId).subscribe((res) => {
      this.studentInfo = res;
    });
  }
}
