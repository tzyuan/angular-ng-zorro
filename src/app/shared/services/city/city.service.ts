/*
 * @Author: 刘利军
 * @Date: 2019-11-11 10:54:29
 * @LastEditors: 刘利军
 * @LastEditTime: 2020-02-17 13:58:24
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }

  getCity = this.http.get<any>(`/reconc_manage/getCity`).pipe(map(res => {
    return res.map(city => {
      return {
        label: city.NAME,
        value: city.VALUE
      };
    });
  }));

  /**
   * @description: 获取省市区
   * @param type （默认查询省,传city查询市,传area查询区
   * @param id 	编号（type为city传递省id，为area传递市id）
   * @return: []
   */
  getArea = (postData?): Observable<any> => {
    return this.http.get<any>(`/point_manage/getCity`, { params: { ...postData } }).pipe(map(res => {
      return res.map(city => {
        return {
          label: city.NAME,
          value: city.VALUE
        };
      });
    }));
  }
}
