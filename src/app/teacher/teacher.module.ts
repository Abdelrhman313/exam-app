import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TeacherRoutingModule } from './teacher.routing';
import { AddNewExamComponent } from './add-new-exam/add-new-exam.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SubjectsComponent } from './subjects/subjects.component';
import { MatRippleModule } from '@angular/material/core';
import { ShowExamComponent } from './show-exam/show-exam.component';
import { MatRadioModule } from '@angular/material/radio';
import { StudentsComponent } from './students/students.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    DashboardComponent,
    AddNewExamComponent,
    SubjectsComponent,
    ShowExamComponent,
    StudentsComponent,
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRippleModule,
    MatRadioModule,
    FormsModule,
    NgbModule,
    MatCardModule,
    TranslateModule,
  ],
})
export class TeacherModule {}
