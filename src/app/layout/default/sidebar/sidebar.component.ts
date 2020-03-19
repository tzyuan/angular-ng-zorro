/*
 * @Date: 2019-06-20 13:59:49
 * @LastAuthor: 曹雪原
 * @lastTime: 2020-03-11 00:14:25
 */
import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/shared/services/layout/layout.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { CookiesService } from 'src/app/shared/services/cookies/cookies.service';
import { NzIconService } from 'ng-zorro-antd/icon';
import * as _ from 'lodash';

@Component({
  selector: 'app-layout-default-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class LayoutDefaultSidebarComponent implements OnInit {

  constructor(
    private layout: LayoutService,
    private router: Router,
    private cookies: CookiesService,
    private iconService: NzIconService
  ) {
    this.iconService.fetchFromIconfont({
      scriptUrl: `https://at.alicdn.com/t/font_1508701_agl1n5twy1i.js`
    });
  }

  isCollapsed = this.layout.isCollapsed;
  sidebarData = [
    {
      path: '', title: '优惠券', level: 0, icon: 'gift',
      children: [
        { path: '/coupon/list', title: '列表', level: 1, }
      ]
    }
  ];
  openChange = (menu, e) => {
    if (e && this.isCollapsed) {
      setTimeout(() => {
        const box = document.querySelector(`.chilbox_${menu.id}`).parentElement.parentElement;
        box.style.transition = 'all .3s';
        if (box.offsetHeight + box.offsetTop > window.innerHeight) {
          if (box.offsetHeight > window.innerHeight) {
            box.style.top = `10px`;
            box.style.bottom = `10px`;
            box.style.overflow = 'auto';
          } else {
            setTimeout(() => {
              box.style.top = `${box.offsetTop - ((box.offsetTop + box.offsetHeight) - window.innerHeight + 10)}px`;
            });
          }
        }
      }, 200);
    }
  }

  ngOnInit() {
    this.layout.isCollapsedEventer.subscribe(res => {
      this.isCollapsed = this.layout.isCollapsed = res;
    });

  }
}
