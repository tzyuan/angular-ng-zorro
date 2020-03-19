import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { AuthGuard } from '../core/auth/auth.guard';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
import { LoginComponent } from '../login/login.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'coupon', loadChildren: () => import('./coupon/coupon.module').then(mod => mod.CouponModule), data: { breadcrumb: '优惠券' } }
    ]
  },
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      { path: '', component: LoginComponent, pathMatch: 'full', data: { title: '登录' } },
      { path: 'login', component: LoginComponent, data: { title: '登录' } }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', })],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
