/*
 * @Author: 曹雪原
 * @since: 2019-05-30 16:23:39
 * @lastTime: 2019-12-03 15:39:35
 * @LastAuthor: 曹雪原
 * @文件相对于项目的路径: /ngadmin_v2/src/app/layout/default/default.component.ts
 * @message:
 */
import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/shared/services/layout/layout.service';
import { HttpClient } from '@angular/common/http';
import { CookiesService } from 'src/app/shared/services/cookies/cookies.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class LayoutDefaultComponent implements OnInit {
  previewVisible = false;
  width = [900, 1055, 797];
  seeIndex = 0;
  iKnowLoading = false;
  constructor(
    private layout: LayoutService,
    private http: HttpClient,
    private cookies: CookiesService
  ) { }
  ngOnInit() {

  }
  sidebarCollapsed = () => {
    this.layout.isCollapsedEventer.emit(!this.layout.isCollapsed);
  }


}
