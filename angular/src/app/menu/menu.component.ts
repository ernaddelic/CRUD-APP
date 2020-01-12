import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public auth: AuthService,
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

  ngOnInit() {
  }

}
