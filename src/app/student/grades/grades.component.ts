import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css'],
})
export class GradesComponent implements OnInit {
  loginStudent: any;
  student: any;
  constructor(private as: AuthService) {}

  ngOnInit(): void {
    this.getLoginStudent();
  }

  getLoginStudent() {
    this.as.getLoginUser().subscribe((res: any) => {
      this.as.user.next(res);
      this.loginStudent = res;
      this.getStudentInfo();
    });
  }

  getStudentInfo() {
    this.as.getStudent(this.loginStudent.userId).subscribe((res) => {
      this.student = res;
    });
  }
}
