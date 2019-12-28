import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let auth;
    if (sessionStorage.getItem('auth')) {
      auth = sessionStorage.getItem('auth')
      req = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${auth}`
        }
      })
    } else if (localStorage.getItem('auth')) {
      auth = localStorage.getItem('auth')
      req = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${auth}`
        }
      })
    }
    return next.handle(req);
  }
}
