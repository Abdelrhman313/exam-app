import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isStudent!: boolean;
  allUsers: any;
  data: any;
  Lang: any;
  constructor(
    private as: AuthService,
    private toast: ToastrService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.setType('teacher');
    this.as.getLoginUser().subscribe((res: any) => {
      if (res.role) {
        this.route.navigate([res.role]);
      }
    });
    this.as.lang.subscribe((res) => {
      this.Lang = res;
    });
  }

  setType(value: string) {
    if (value === 'student') {
      this.as.GetStudents().subscribe((res: any) => {
        if (res.length) {
          this.allUsers = res;
        }
      });
    } else if (value === 'teacher') {
      this.as.GetTeachers().subscribe((res: any) => {
        if (res.length) {
          this.allUsers = res;
        }
      });
    }
  }

  onSubmit(form: any) {
    let flag = this.isStudent ? 'student' : 'teacher';
    let index = this.allUsers?.findIndex(
      (user: any) =>
        user.email === form.value.email && user.password == form.value.password
    );

    if (index === -1) {
      this.toast.error('UnCorrect Email Or Password!', 'Login State', {
        closeButton: true,
        progressBar: true,
        timeOut: 2000,
      });
    } else {
      this.data = {
        name: this.allUsers[index].name,
        email: form.value.email,
        role: flag,
        userId: this.allUsers[index].id,
      };
      this.as.setLoginUser(this.data).subscribe((res) => {
        this.as.user.next(res);
        this.toast.success('Login Successfully', 'Login State', {
          closeButton: true,
          progressBar: true,
          timeOut: 2000,
        });

        this.route.navigate([flag]);
      });
    }
  }
}
