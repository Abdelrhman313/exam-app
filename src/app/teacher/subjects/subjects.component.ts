import { Router } from '@angular/router';
import { AuthService } from './../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/shared/services/subject.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css'],
})
export class SubjectsComponent implements OnInit {
  allSubjects: any;
  colors: any[];
  loginUser: any = null;
  loginUserSubjects: any;
  existSubject: any;
  Index: any;
  lang: any;
  constructor(
    private sbs: SubjectService,
    private as: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.colors = [
      '#4C9141',
      '#3E5F8A',
      '#8A9597',
      '#2D572C',
      '#20214F',
      '#412227',
      '#256D7B',
      '#633A34',
      '#193737',
      '#424632',
      '#316650',
    ];
  }

  ngOnInit(): void {
    this.getLoginUser();

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

  getLoginUser() {
    this.as.getLoginUser().subscribe((res: any) => {
      this.as.user.next(res);
      this.loginUser = res;
      if (this.loginUser.role === 'student') {
        this.getLoginStudent(res.userId);
      }
      this.getAllSubjects();
    });
  }

  getLoginStudent(id: any) {
    this.as.getStudent(id).subscribe((res: any) => {
      this.loginUserSubjects = res.subjects;
    });
  }

  getAllSubjects() {
    this.sbs.getSubjects().subscribe((res: any) => {
      if (this.loginUser.role === 'teacher') {
        this.allSubjects = res.filter(
          (subject: any) => subject.teacherId === this.loginUser.userId
        );
      } else if (this.loginUser.role === 'student') {
        this.allSubjects = res;
      }
    });
  }

  DeleteSubject(index: number, id: number) {
    this.allSubjects.splice(index, 1);
    this.sbs.deleteSubject(id).subscribe(() => {
      this.toastr.success('Deleted Successfully');
    });
  }

  showSubjectExam(id: number) {
    this.router.navigate([`teacher/show-exam/${id}`]);
  }

  startSubjectExam(id: number, subjectName: string) {
    this.router.navigate([`teacher/show-exam/${id}`]);
  }
}
