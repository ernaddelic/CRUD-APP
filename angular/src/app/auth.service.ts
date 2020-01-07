import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtResponse } from './jwt-response';
import { Login } from './login';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api_url: string = 'http://localhost:8080/login';
  public rememberMe: boolean = false;

  constructor(private http:HttpClient) {
   }

  login = (login: Login): Observable<JwtResponse> => {
    return this.http.post(this.api_url, login)
    .pipe(map((jwtResponse: JwtResponse) => {
      let auth = jwtResponse.jwt;
      if (this.rememberMe) {
        localStorage.setItem('auth', auth)
      } else {
        sessionStorage.setItem('auth', auth)
        localStorage.removeItem('auth')
      }
      return jwtResponse;
    }))
    
  }

  getUser = (): string => {
    return sessionStorage.getItem('auth');
  }

  logOut = (): void => {
    sessionStorage.removeItem("auth");
    localStorage.removeItem("auth");
  }

  isLogged = (): boolean => {
    return sessionStorage.getItem("auth") !== null
    || localStorage.getItem('auth') !== null;
  }
}
