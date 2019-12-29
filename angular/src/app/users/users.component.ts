import { Component, OnInit, NgZone } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  message: string;
  expired: string;
  text:string = '';
  refresh = (): void => {
    this.service.getAll().subscribe(
      (users: User[]) => {
        this.updateUsers(users);
      },
      (err) => {
        this.expired = "Your session token has expired!"
      }
    )
  }

  updateUsers = (users: User[]): void => {
    this.users = users;
  }

  constructor(public service: UserService,
    private router: Router,
    private ngZone: NgZone) { }

  ngOnInit(): void {
    this.refresh(); 
  }

  goToLogin = (): void => {
    this.router.navigate(['/login']);
    localStorage.removeItem('auth');
  }

  getAccess = (event: string, user?: User): void => {
    this.service.getAccess().subscribe(
      (data: string) => {
        if (event == 'add') {
          this.ngZone.run(() => this.router.navigate(['/add-user']));
        }
        if (event == 'edit') {
          localStorage.removeItem('userID');
          localStorage.setItem('userID', user.id.toString());
          this.ngZone.run(() => this.router.navigate(['/edit-user']));
        } else {
          this.service.deleteUser(user.id).subscribe(
            (data: string ) => {
              this.refresh();
            }
          )
        }
      },
      (err) => {
        this.message = 'Only admin can perform this action!'
        setTimeout(() => {
          this.message = ''
        },2000)
      }
    )
  }
}
