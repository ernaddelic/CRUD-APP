import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Registration } from './registration';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private api_url = 'http://localhost:8080/user-portal/register';
  accountCreated: string = "Account Created!";

  constructor(private http: HttpClient) { }

  registerUser = (registration: Registration): Observable<string> => {
    return this.http.post(this.api_url, registration, {
      responseType: 'text'
    }).pipe(
      map(data => {
        sessionStorage.setItem("created", this.accountCreated);
        return data;
      })
    )
  }
}