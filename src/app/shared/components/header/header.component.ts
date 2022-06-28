import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isOpen: boolean;
  user: any = null;
  Lang: any;
  theme: any;
  constructor(
    private as: AuthService,
    private router: Router,
    private toast: ToastrService,
    public translate: TranslateService
  ) {
    this.isOpen = false;
  }

  ngOnInit(): void {
    this.as.user.subscribe((data: any) => {
      if (data?.role) {
        this.user = data;
      }
    });

    localStorage.getItem('lang')
      ? (this.Lang = localStorage.getItem('lang'))
      : (this.Lang = 'AR');

    this.as.lang.next(this.Lang);
    localStorage.setItem('lang', this.Lang);

    localStorage.getItem('theme')
      ? (this.theme = localStorage.getItem('theme'))
      : (this.theme = 'Dark');

    this.as.theme.next(this.theme);
    localStorage.setItem('theme', this.theme);

    //Change To Arabic Font
    let fontFileLink = document.getElementById('fontFileLink');
    if (this.Lang === 'EN') {
      fontFileLink?.setAttribute('href', '../assets/css/arabicFont.css');
      fontFileLink?.setAttribute('rel', 'stylesheet');
      fontFileLink?.setAttribute('type', 'text/css');
    } else if (this.Lang === 'AR') {
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

    // Translate
    this.translate.use(this.Lang);
  }

  closeNavbar = () => {
    setTimeout(() => {
      this.isOpen = false;
    }, 300);
  };

  logout = () => {
    let model = {};
    this.as.setLoginUser(model).subscribe((res) => {
      this.user = null;
      this.as.user.next(res);
      this.router.navigate(['auth/login']);
      this.toast.success('LogOut Successfully', 'LogOut State');
    });
  };

  changeLanguage() {
    this.Lang === 'AR' ? (this.Lang = 'EN') : (this.Lang = 'AR');
    this.as.lang.next(this.Lang);
    localStorage.setItem('lang', this.Lang);
    this.translate.use(this.Lang);
    //Change To Arabic Font
    let fontFileLink = document.getElementById('fontFileLink');
    if (this.Lang === 'EN') {
      fontFileLink?.setAttribute('href', '../assets/css/arabicFont.css');
      fontFileLink?.setAttribute('rel', 'stylesheet');
      fontFileLink?.setAttribute('type', 'text/css');
    } else if (this.Lang === 'AR') {
      fontFileLink?.setAttribute('href', '');
      fontFileLink?.setAttribute('rel', 'stylesheet');
      fontFileLink?.setAttribute('type', 'text/css');
    }
  }

  changeTheme() {
    this.theme === 'Light' ? (this.theme = 'Dark') : (this.theme = 'Light');
    this.as.theme.next(this.theme);
    localStorage.setItem('theme', this.theme);

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
}
