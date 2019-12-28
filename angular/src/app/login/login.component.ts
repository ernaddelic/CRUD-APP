import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { JwtResponse } from '../jwt-response';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string;
  formGroup: FormGroup;
  created: string;

  constructor(public auth: AuthService,
    private router: Router,
    private builder: FormBuilder,
    private service: UserService,
    private ngZone: NgZone) {
      this.formGroup = builder.group({
        'name': ['', Validators.required],
        'password': ['', Validators.required]
      })
      this.created = sessionStorage.getItem('created');
     }

  ngOnInit() {
  }

  login = (): void => {
    this.auth.login(this.formGroup.value)
    .subscribe(
      (data: JwtResponse) => {
        sessionStorage.removeItem('created');
        this.ngZone.run(() => this.router.navigate(['/user-list']));
      },
      (err: Error) => {
        this.message = 'Invalid username and/or password';
        setTimeout(() => {
          this.message = '';
        },3000)
      })
  }   
}
