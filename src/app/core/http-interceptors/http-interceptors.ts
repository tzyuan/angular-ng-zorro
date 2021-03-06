/*
 * @Date: 2019-05-30 11:32:20
 * @LastAuthor: Do not edit
 * @lastTime: 2019-11-18 09:14:55
 */
import { Injectable, Injector } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponseBase, HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders
} from '@angular/common/http';
import { Observable, of, throwError, observable } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { NzNotificationService, NzMessageService, NzModalService } from 'ng-zorro-antd';
import { environment } from 'src/environments/environment';
import { CookiesService } from 'src/app/shared/services/cookies/cookies.service';
import { Router } from '@angular/router';
import { isUndefined } from 'util';


const CODEMESSAGE = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};

/** Pass untouched request through to the next request handler. */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
    constructor(
        private injector: Injector,
        private cookies: CookiesService,
        private router: Router
    ) { }

    private get notification(): NzNotificationService {
        return this.injector.get(NzNotificationService);
    }
    private get msg(): NzMessageService {
        return this.injector.get(NzMessageService);
    }
    private get modal(): NzModalService {
        return this.injector.get(NzModalService);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let URL = req.url;
        if (!URL.startsWith('https://') && !URL.startsWith('http://')) {
            URL = environment.SERVER_URL + URL;
        }

        let httpHeaders = new HttpHeaders();
        if (this.cookies.getCookie('sign') && this.cookies.getCookie('uuid')) {
            httpHeaders = new HttpHeaders()
                .set('Authorization', this.cookies.getCookie('sign'))
                .set('UUID', this.cookies.getCookie('uuid'));
        }
        const newReq = req.clone({ url: URL, headers: httpHeaders });
        return next.handle(newReq).pipe(
            mergeMap((event: any) => {
                // 允许统一对请求错误处理
                if (event instanceof HttpResponseBase) {
                    const handleData = this.handleData(event);
                    return handleData;
                }
                // 若一切都正常，则后续操作
                return of(event);
            }),
            catchError((err: HttpErrorResponse) => {
                return throwError(err.error);
            }),
        );
    }


    // 数据处理方法
    private handleData(ev: HttpResponseBase): Observable<any> {
        // this.checkStatus(ev);
        switch (ev.status) {
            case 200:
                if (ev instanceof HttpResponse) {
                    const body: any = ev.body;
                    if (body && (isUndefined(body.code) && isUndefined(body.error))) {
                        return of(new HttpResponse(Object.assign(event, { body })));
                    }
                    if (body && (body.code === 200 || body.code === 0 || body.error === 0)) {
                        if (body.pagination) {
                            const data = {
                                data: body.data || body.obj,
                                pagination: body.pagination
                            };
                            return of(new HttpResponse(Object.assign(event, { body: data })));
                        }
                        return of(new HttpResponse(Object.assign(event, { body: body.data || body.obj })));
                    } else {
                        if (body.code === 500) {
                            this.router.navigateByUrl('/passport/login');
                        } else if (body.code === 401) {
                            this.msg.error('登陆过期');
                            return throwError({});
                        } else {
                            this.msg.error(body.msg || body.status);
                            return throwError({});
                        }

                    }
                }
                break;
            default:
                if (ev instanceof HttpErrorResponse) {
                    return throwError(ev);
                }
                break;
        }
    }

}
