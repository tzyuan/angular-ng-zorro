/*
 * @Author: 曹雪原
 * @since: 2019-05-30 16:57:40
 * @lastTime: 2019-11-29 15:59:14
 * @LastAuthor: 曹雪原
 * @文件相对于项目的路径: /ngadmin_v2/src/app/layout/default/header/header.component.ts
 * @message:
 */
import { Component, OnInit } from '@angular/core';
import { CookiesService } from 'src/app/shared/services/cookies/cookies.service';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/shared/services/layout/layout.service';

@Component({
  selector: 'app-layout-default-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class LayoutDefaultHeaderComponent implements OnInit {

  constructor(
    private cookies: CookiesService,
    private router: Router,
    public layout: LayoutService
  ) { }

  name = this.cookies.getCookie('userName');
  department = this.cookies.getCookie('userDepartName');
  roleName = this.cookies.getCookie('roleName');
  visible = false;
  logout = () => {
    this.cookies.clearAll();
    window.sessionStorage.clear();
    this.router.navigate(['/passport/login']);
  }

  sidebarCollapsed = () => {
    this.layout.isCollapsedEventer.emit(!this.layout.isCollapsed);
  }

  ngOnInit() {
  }

}
