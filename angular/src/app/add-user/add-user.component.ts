import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  formGroup: FormGroup;
  alert: string;

  constructor(fb: FormBuilder,
    public service: UserService,
    private router: Router,
    private ngZone: NgZone) {
    this.formGroup = fb.group({
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

  ngOnInit() {
    this.formGroup.valueChanges.subscribe(
      value => console.log(value)
    )
  }

  create = (): void => {
    if (!this.formGroup.valid) {
      this.alert = "All fields are required";
      setTimeout(() => {
        this.alert = "";
      }, 1000)
      return;
    }
    this.service.createUser(this.formGroup.value)
    .subscribe((user: User) => {
      this.ngZone.run(() => this.router.navigate(['/user-list']));   
  },
  (err) => console.log(err))
  }

  goToUsers = (): void => {
    this.router.navigate(['user-list']);
  }
  onClear = () => {
    this.formGroup.reset();
  }
}
