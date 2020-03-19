import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/auth/auth.guard';
import { CouponListComponent } from './coupon-list/coupon-list.component';


const routes: Routes = [
  { path: 'list', canActivate: [AuthGuard], component: CouponListComponent, data: { breadcrumb: '优惠券列表' } },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponRoutingModule { }
