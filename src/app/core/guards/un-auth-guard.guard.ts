import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UnAuthGuardGuard implements CanActivate {
  constructor(private as: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve) => {
      this.as.getLoginUser().subscribe((res: any) => {
        this.as.user.next(res);
        if (res.role) {
          resolve(true);
        } else {
          resolve(false);
          this.router.navigate([`auth/login`]);
        }
      });
    });
  }
}
