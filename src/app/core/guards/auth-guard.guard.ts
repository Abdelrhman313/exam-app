import { AuthService } from 'src/app/shared/services/auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardGuard implements CanActivate {
  constructor(private as: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve) => {
      this.as.getLoginUser().subscribe((res: any) => {
        this.as.user.next(res);
        if (res.role) {
          resolve(false);
          this.router.navigate([`/${res.role}`]);
        } else {
          resolve(true);
        }
      });
    });
  }
}
