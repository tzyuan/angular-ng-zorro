/*
 * @Date: 2019-05-31 09:35:45
 * @LastAuthor: 曹雪原
 * @lastTime: 2019-11-26 15:54:37
 */
/*
 * @Date: 2019-05-31 09:35:45
 * @LastEditors: 曹雪原
 * @LastEditTime: 2019-11-11 13:49:21
 */
import { Component, OnInit } from '@angular/core';
import { CookiesService } from 'src/app/shared/services/cookies/cookies.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private cookies: CookiesService,
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router
  ) { }
  loginForm = this.fb.group({
    name: [null, Validators.required],
    pwd: [null, Validators.required],
  });

  loading = false;
  doLogin = () => {
    if (this.loginForm.valid) {
      this.cookies.clearAll();
      window.localStorage.clear();
      window.sessionStorage.clear();
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
        this.cookies.setCookie('userName', 'admin');
        this.router.navigateByUrl('');
      }, 1000);
    }

  }
  ngOnInit() {
    const name = this.cookies.getCookie('userName');
    if (name) {
    }
  }

}
