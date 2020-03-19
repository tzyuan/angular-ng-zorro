import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CouponRoutingModule } from './coupon-routing.module';
import { CouponListComponent } from './coupon-list/coupon-list.component';


@NgModule({
  declarations: [CouponListComponent],
  imports: [
    CommonModule,
    CouponRoutingModule
  ]
})
export class CouponModule { }
