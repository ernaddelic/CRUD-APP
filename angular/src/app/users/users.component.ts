import { Component, OnInit } from '@angular/core';
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

  updateUsers = (users: User[]): void => {
    this.users = users;
  }

  constructor(private service: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.service.getAll().subscribe(
      (users: User[]) => {
        this.updateUsers(users);
      }
    )
  }

  goToAdd = (user: User): void => {
    this.service.createUser(user).subscribe(
      (users: User[]) => {
        this.router.navigate(['/add-user']);
      },
      (err) => {
        this.message = 'Only admin can perform this action!';
        setTimeout(() => {
          this.message = '';
        },1000)
      }
    )
    
  }

  goToEdit = (user: User): void => {
    localStorage.removeItem('userID');
    localStorage.setItem('userID', user.id.toString());
    this.service.editUser(user).subscribe(
      (user: User[]) => {
        this.router.navigate(['/edit-user']);
      },
      (err) => {
        this.message = 'Only admin can perform this action!';
        setTimeout(() => {
          this.message = '';
        },1000)
      }
    )
    
    
  }

  delete = (user: User): void => {
    this.service.deleteUser(user.id)
    .subscribe((users: User[]) => {
      console.log(users);
      this.users = users;
    },
    (err) => {
      this.message = 'Only admin can perform this action!';
      setTimeout(() => {
        this.message = '';
      },1000)
    })
  }
}
