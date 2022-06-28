import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  loginUser: any;
  constructor(private as: AuthService, public ts: TranslateService) {}

  ngOnInit(): void {
    this.getLoginUser();
  }

  getLoginUser() {
    this.as.getLoginUser().subscribe((res) => {
      this.as.user.next(res);
      this.loginUser = res;
    });
  }
}
