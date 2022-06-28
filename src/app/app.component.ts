import { RoutingAnimation } from './shared/animations/routing-animation';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [RoutingAnimation],
})
export class AppComponent implements OnInit {
  lang: any;
  theme: any;
  constructor(private as: AuthService, private cdref: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getUser();
    this.as.lang.subscribe((res) => {
      if (res) {
        this.lang = res;
      } else {
        this.lang = 'AR';
      }
    });
    this.as.theme.subscribe((res) => {
      if (res) {
        this.theme = res;
      } else {
        this.theme = 'Dark';
      }
    });

    //Change To Arabic Font
    let fontFileLink = document.getElementById('fontFileLink');
    if (this.lang === 'EN') {
      fontFileLink?.setAttribute('href', '../assets/css/arabicFont.css');
      fontFileLink?.setAttribute('rel', 'stylesheet');
      fontFileLink?.setAttribute('type', 'text/css');
    } else if (this.lang === 'AR') {
      fontFileLink?.setAttribute('href', '');
      fontFileLink?.setAttribute('rel', 'stylesheet');
      fontFileLink?.setAttribute('type', 'text/css');
    }

    //Change Theme
    let elem = document.getElementById('myLink');
    if (this.theme === 'Light') {
      elem?.setAttribute('href', '../assets/css/dark-theme.css');
      elem?.setAttribute('rel', 'stylesheet');
      elem?.setAttribute('type', 'text/css');
    } else if (this.theme === 'Dark') {
      elem?.setAttribute('href', '');
      elem?.setAttribute('rel', 'stylesheet');
      elem?.setAttribute('type', 'text/css');
    }
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  getUser() {
    this.as.getLoginUser().subscribe((res: any) => {
      this.as.user.next(res);
    });
  }
}
