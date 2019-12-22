import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';

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
    private router: Router) {
    this.formGroup = fb.group({
      'id': [0],
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'age': ['', Validators.required],  
    })
   }

  ngOnInit() {
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
      console.log("Added user: ", user);
    this.router.navigate(['/user-list']);    
  },
  (err) => console.log(err))
  }

  goToUsers = (): void => {
    this.router.navigate(['user-list']);
  }
}
