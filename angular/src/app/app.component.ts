import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private auth: AuthService,
    private router: Router) {}

  logOut = (): boolean => {
    this.auth.logOut();
    this.router.navigate(['/login']);
    return false;
  }

  seeUsers = (): boolean => {
    if (!this.auth.isLogged()) {
      alert("Login to see list of users");
      return false;
    }
    this.router.navigate(['/user-list']);
    return false;
  }
}
