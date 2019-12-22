import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { Router } from '@angular/router';


export function matchValue(control: AbstractControl): {[key:string]: boolean}  {
  if (control.get('password').value !== control.get('passwordConfirm').value) {
    return {notMatch: true}
  }
  return null;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  myForm: FormGroup;
  message: string;
  name: AbstractControl;
  password: AbstractControl;
  passwordConfirm: AbstractControl;
  displayErorr: boolean;
  displayMatch: boolean;

  constructor(private fb: FormBuilder,
    private service: RegistrationService,
    private router: Router) {
     
   }

   registerUser = (): void => {
     if (!this.myForm.valid) {
       this.message = "Form is not valid!";
       setTimeout(() => {
        this.message = "";
      },2000)
       return;
     }
     this.service.registerUser(this.myForm.value).subscribe(
       (data: string) => {
         console.log(data);
         this.router.navigate(['/login'])
       },
       (err) => {
         this.message = "Account already exists!";
         setTimeout(() => {
           this.message = "";
         },2000)
       }
     )
   }
  ngOnInit(): void { 
    this.myForm = this.fb.group({
      'name': ['', Validators.required],
      'password': ['', Validators.compose([
        Validators.required, Validators.minLength(8)
      ]
      )],
      'passwordConfirm': ['', Validators.compose([
        Validators.required, Validators.minLength(8),
        
      ])]
    }, {validator: matchValue})
    this.name = this.myForm.controls['name'];
    this.password = this.myForm.controls['password'];
    this.passwordConfirm = this.myForm.controls['passwordConfirm'];
 }
}
