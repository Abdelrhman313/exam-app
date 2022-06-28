import { environment as env } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  constructor(private http: HttpClient) {}

  // add new subject
  addNewSubject(data: any) {
    return this.http.post(`${env.api}/subjects`, data);
  }

  // get all subjects
  getSubjects() {
    return this.http.get(`${env.api}/subjects`);
  }

  // Get Exam
  getExam(id: number) {
    return this.http.get(`${env.api}/subjects/${id}`);
  }

  // Delete Subject
  deleteSubject(id: number) {
    return this.http.delete(`${env.api}/subjects/${id}`);
  }

  //Delete Question
  deleteQuestions(id: any, data: any) {
    return this.http.put(`${env.api}/subjects/${id}`, data);
  }
  // EditQuestions
  editQuestions(id: any, data: any) {
    return this.http.put(`${env.api}/subjects/${id}`, data);
  }
}
