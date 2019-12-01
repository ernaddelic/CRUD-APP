import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string;
  formGroup: FormGroup;
  name: AbstractControl;
  password: AbstractControl;

  constructor(public auth: AuthService,
    private router: Router,
    private builder: FormBuilder) {
      this.formGroup = builder.group({
        'name': ['', Validators.required],
        'password': ['', Validators.required]
      })
      this.name = this.formGroup.controls['name'];
      this.password = this.formGroup.controls['password'];
     }

  ngOnInit() {
  }

  login = (): void => {
    if (this.auth.login(this.name.value, this.password.value)) {
      this.router.navigate(['/user-list']);
    } else {
      this.message = 'Invalid Credentials!';
      setTimeout(() => {
        this.message = '';
      },1000)
    }
  }
}
