import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api_url: string = 'http://localhost:8080/user-portal/login';

  constructor(private http:HttpClient) { }

  

  login = (user: string, password: string): Observable<string> => {
    return this.http.get(this.api_url, {
      responseType: 'text',
      headers: {
        Authorization: 'Basic ' + btoa(`${user}:${password}`)
      }
    }).pipe(
      map((data: string) => {
        sessionStorage.setItem('user', user);
        let auth = 'Basic ' + btoa(`${user}:${password}`);
        sessionStorage.setItem('auth', auth);
        return data;
      })
    )
  }

  getUser = (): string => {
    return sessionStorage.getItem('user');
  }

  logOut = (): void => {
    sessionStorage.removeItem("user");
  }

  isLogged = (): boolean => {
    return sessionStorage.getItem("user") !== null;
  }
}
