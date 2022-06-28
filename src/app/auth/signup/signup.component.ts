import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

interface RegisterModel {
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  myForm: RegisterModel;
  isStudent!: boolean;
  myFlag!: string;
  allStudents: any;
  allTeachers: any;
  Lang: any;
  constructor(
    private as: AuthService,
    private route: Router,
    private toast: ToastrService,
    public ts: TranslateService
  ) {
    this.myForm = {
      name: '',
      email: '',
      password: '',
    };
  }

  ngOnInit() {
    this.getAllStudents();
    this.getAllTeachers();

    this.as.lang.subscribe((res) => {
      this.Lang = res;
    });
  }

  getAllStudents() {
    this.as.GetStudents().subscribe((res) => {
      this.allStudents = res;
    });
  }
  getAllTeachers() {
    this.as.GetTeachers().subscribe((res) => {
      this.allTeachers = res;
    });
  }

  onSubmit(form: any) {
    this.myFlag = this.isStudent ? 'student' : 'teacher';
    this.myForm = {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
    };

    let studentIndex = this.allStudents.findIndex(
      (s: any) => s.email === form.value.email
    );
    let teacherIndex = this.allTeachers.findIndex(
      (t: any) => t.email === form.value.email
    );

    if (studentIndex === -1 && teacherIndex === -1) {
      this.toast.success('Create Account Successfully', 'Registration State', {
        closeButton: true,
        progressBar: true,
        timeOut: 2000,
      });

      this.as
        .AddNewStudentOrTeacher(this.myFlag, this.myForm)
        .subscribe((res) => {
          const data = {
            name: res.name,
            email: res.email,
            role: this.myFlag,
            userId: res.id,
          };
          this.as.setLoginUser(data).subscribe((res) => {
            this.as.user.next(res);
          });
          this.route.navigate([this.myFlag]);
        });
    } else {
      this.toast.error('This Email is Already Exist', 'Registration State', {
        closeButton: true,
        progressBar: true,
        timeOut: 3000,
      });
    }
  }
}
