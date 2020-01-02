import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { JwtResponse } from '../jwt-response';
import { UserService } from '../user.service';
import { RegistrationService } from '../registration.service';

export function matchValue(control: AbstractControl): {[key:string]: boolean}  {
  if (control.get('password').value !== control.get('passwordConfirm').value) {
    return {notMatch: true}
  }
  return null;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string;
  loginGroup: FormGroup;
  registrationGroup: FormGroup;

  constructor(public auth: AuthService,
    private router: Router,
    private builder: FormBuilder,
    private service: UserService,
    private ngZone: NgZone,
    private regService: RegistrationService) {}

  ngOnInit() {
    this.loginGroup = this.builder.group({
      'email': ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      'password': ['', Validators.compose([
        Validators.required, Validators.minLength(6)
      ])]
    })
    this.registrationGroup = this.builder.group({
      'name': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.compose([
        Validators.required, Validators.email
      ])),
      'password': new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(6)
      ]
      )),
      'passwordConfirm':  new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(6),
        
      ]))
    }, {validator: matchValue})
  }

  login = (): void => {
    if (!this.loginGroup.valid) {
      return;
    }
    this.auth.login(this.loginGroup.value)
    .subscribe(
      (data: JwtResponse) => {
        this.ngZone.run(() => this.router.navigate(['/user-list']));
      },
      (err: Error) => {
        this.message = 'Invalid email and/or password';
        setTimeout(() => {
          this.message = '';
        },3000)
      })
  }
  registerUser = (): void => {
    if (!this.registrationGroup.valid) {
      return;
    }
    this.regService.registerUser(this.registrationGroup.value).subscribe(
      (data: string) => {
        alert("Account created!");
        location.reload(); 
      },
      (err) => {
        this.message = "Account already exists!";
        console.log(err);
        setTimeout(() => {
          this.message = "";
        },3000)
      }
    )
  }   
}
