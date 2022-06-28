import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';

@NgModule({
  declarations: [HomeComponent, NotFoundComponent],
  imports: [CommonModule, RouterModule, TranslateModule],
  providers: [AuthGuardGuard],
})
export class CoreModule {}
