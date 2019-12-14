import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user';
import { JwtResponse } from './jwt-response';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api_url: string = 'http://localhost:8080/user-portal/login';

  constructor(private http:HttpClient) { }

  

  login = (user: string, password: string): Observable<JwtResponse> => {
    return this.http.post(this.api_url, {
      name: user,
      password: password
    }).pipe(map((jwtResponse: JwtResponse) => {
      sessionStorage.setItem('user', user);
      let auth = jwtResponse.jwt;
      sessionStorage.setItem('auth', auth);
      return jwtResponse;
    }))
    
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
