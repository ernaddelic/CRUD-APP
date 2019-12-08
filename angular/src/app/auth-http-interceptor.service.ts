import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (sessionStorage.getItem('user') && sessionStorage.getItem('auth')) {
      req = req.clone(
        {
          setHeaders: {
            Authorization: sessionStorage.getItem('auth')
          }
        }
      )
    }
    return next.handle(req);
  }
}
