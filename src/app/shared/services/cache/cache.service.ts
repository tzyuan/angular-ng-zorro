/*
 * @Author: 曹雪原
 * @since: 2019-12-16 11:58:42
 * @lastTime: 2019-12-16 15:18:52
 * @LastAuthor: 曹雪原
 * @文件相对于项目的路径: /ngadmin_v2/src/app/shared/services/cache/cache.service.ts
 * @message: 
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor(
    private http: HttpClient
  ) { }

  getCache = (url: string): Observable<any> => {
    let d = sessionStorage.getItem(url);
    const time = sessionStorage.getItem(`${url}_endDate`);
    if (d !== null && time !== null) {
      if (moment().isAfter(moment(time))) {
        d = null;
        this.clearCache(url);
      }
    }
    // 判断是否超时
    return Observable.create(obser => {
      if (d === null) {
        this.http.get<any>(url, { params: { limit: '0' } }).subscribe(res => {
          this.setCache(url, JSON.stringify(res));
          obser.next(res);
          obser.complete();
        });
      } else {
        obser.next(JSON.parse(d));
        obser.complete();
      }
    });
  }

  setCache = (key: string, data: string, time: number = 60) => {
    sessionStorage.setItem(key, data);
    sessionStorage.setItem(`${key}_endDate`, (moment().add(time, 'minutes').valueOf().toString()));
  }

  clearCache = (key: string) => {
    sessionStorage.clearItem(key);
    sessionStorage.clearItem(`${key}_endDate`);
  }
}
