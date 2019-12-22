import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  formGroup: FormGroup;
  index: number = parseInt(localStorage.getItem('userID'));

  constructor(fb: FormBuilder,
    public service: UserService,
    private router: Router) {
    this.formGroup = fb.group({
      'id': ['', Validators.required],
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'age': ['', Validators.required],  
    })

  }

  edit = (): void => {
     this.service.editUser(this.formGroup.value)
     .subscribe((user: User) => {
       this.router.navigate(['/user-list']);
  },
  (err) => console.log(err))
  }

  goToUsers = (): void => {
    this.router.navigate(['user-list']);
  }

  ngOnInit(): void {
    this.service.getUserById(this.index).subscribe(
      (user: User) => {
        this.formGroup.setValue(user);
      })
  }
}
