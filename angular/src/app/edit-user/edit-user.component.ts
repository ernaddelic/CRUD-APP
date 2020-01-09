import { Component, OnInit, Input, NgZone } from '@angular/core';
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
    private router: Router,
    private ngZone: NgZone) {
      this.formGroup = fb.group({
        'id': [null],
        'fullName': ['', Validators.required],
        'email': ['', Validators.compose([
          Validators.required, Validators.email
        ])],
        'mobile': ['', Validators.compose([
          Validators.required, Validators.minLength(8)
        ])],
        'city': [''],
        'gender': [''],
        'hireDate': [''],
        'isPermanent': [false],  
      })
     }

  edit = (): void => {
    this.service.editUser(this.formGroup.value)
    .subscribe((user: User) => {
    this.ngZone.run(() => this.router.navigate(['/user-list']));
  })
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
