import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  message: string;
  expired: string;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'age', 'action'];
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatSort) sort: MatSort;
  refresh = (): void => {
    this.service.getAll().subscribe(
      (users: User[]) => {
        this.dataSource = new MatTableDataSource(users);
      },
      (err) => {
        this.expired = "Your session token has expired!"
      }
    )
  }

  constructor(public service: UserService,
    private router: Router,
    private ngZone: NgZone) { }

  ngOnInit(): void {
    this.refresh();
  }

  applyFilter(filterValue: string)  {
    this.dataSource.filter = filterValue.trim().toLowerCase();

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
        alert("Only admin can perform this action!")
      }
    )
  }
}
