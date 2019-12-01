import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login = (user: string, password: string): boolean => {
    if (user == "user" && password == "password") {
      localStorage.setItem("user", user);
      return true;
    }
    return false;
  }

  getUser = (): string => {
    return localStorage.getItem('user');
  }

  logOut = (): void => {
    localStorage.removeItem("user");
  }

  isLogged = (): boolean => {
    return localStorage.getItem("user") !== null;
  }
}
