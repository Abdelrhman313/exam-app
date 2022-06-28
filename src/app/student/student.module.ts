import { MatButtonModule } from '@angular/material/button';
import { StudentRoutingModule } from './student.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GradesComponent } from './grades/grades.component';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [DashboardComponent, GradesComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    MatCardModule,
    MatButtonModule,
    TranslateModule,
  ],
})
export class StudentModule {}
