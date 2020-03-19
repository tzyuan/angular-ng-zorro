/*
 * @Date: 2019-05-31 09:46:54
 * @LastEditors: 曹雪原
 * @LastEditTime: 2019-10-31 12:31:28
 */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { CookiesService } from 'src/app/shared/services/cookies/cookies.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private cookies: CookiesService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const name = this.cookies.getCookie('userName');
    console.log(next);
    console.log(state);

    if (name) {
      console.log(true);
      return true;
    }
    // this.router.navigateByUrl('/passport/login');
    return false;
  }
}
