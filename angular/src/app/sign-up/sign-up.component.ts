import { Component, OnInit, NgZone} from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
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
  submitted: boolean;

  constructor(private fb: FormBuilder,
    private service: RegistrationService,
    private router: Router,
    private ngZone: NgZone) {}

   registerUser = (): void => {
     this.submitted = true;
     setTimeout(() => {
       this.submitted = false;
     }, 3000);
     if (!this.myForm.valid) {
       return;
     }
     this.service.registerUser(this.myForm.value).subscribe(
       (data: string) => {
        this.ngZone.run(() => this.router.navigate(['/login']));  
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
      'name': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(8)
      ]
      )),
      'passwordConfirm':  new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(8),
        
      ]))
    }, {validator: matchValue})
  }
}
