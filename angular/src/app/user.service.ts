import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user';
import { text } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  private api_url: string = 'http://localhost:8080/user-portal/users/';

  constructor(private http: HttpClient) { }

  getAll = (): Observable<User[]> => {
    return this.http.get(this.api_url).pipe(
      map((users: User[]) => {
        return users;
      })
    )
  }

  getUserById = (id: number): Observable<User> => {
    return this.http.get(this.api_url + id).pipe(
      map((user: User) => {
        return user;
      })
    )
  }

  createUser = (user: User): Observable<User> => {
    return this.http.post(this.api_url, user).pipe(
      map((user: User) => {
        return user;   
      })
    )
  }

  editUser = (user: User): Observable<User> => {
    return this.http.put(this.api_url + user.id, user)
    .pipe(map((user: User) => {
      return user;
    }))
  }

  deleteUser = (id: number): Observable<string> => {
    return this.http.delete(this.api_url + id, {
      responseType: 'text'
    })
    .pipe(map((message: string) => {
      console.log(message);
      return message;
    }))
  }
}
