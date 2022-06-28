import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment as env } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new Subject();
  lang = new Subject();
  theme = new Subject();

  constructor(private http: HttpClient) {}

  //Create New Student/Teacher
  AddNewStudentOrTeacher(flag: string, data: any): Observable<any> {
    return this.http.post(`${env.api}/${flag}s`, data);
  }
  //Get all Students/Teachers
  GetStudents() {
    return this.http.get(env.api + '/students');
  }
  GetTeachers() {
    return this.http.get(env.api + '/teachers');
  }

  getStudent(id: any) {
    return this.http.get(`${env.api}/students/${id}`);
  }
  updateStudent(id: any, model: any) {
    return this.http.put(`${env.api}/students/${id}`, model);
  }
  // login
  setLoginUser(data: any) {
    return this.http.put(`${env.api}/login/1`, data);
  }

  getLoginUser() {
    return this.http.get(`${env.api}/login/1`);
  }
}
