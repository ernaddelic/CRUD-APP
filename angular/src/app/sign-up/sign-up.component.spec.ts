import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';
import { FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { Location } from '@angular/common';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let router: Router;
  let location: Location;
  const routes: Routes = [
    {path: 'login', component: LoginComponent}
  ]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpComponent, LoginComponent ],
      imports: [FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        HttpClientModule,
        RouterTestingModule.withRoutes(routes)]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should test form validity', () => {
    const form = component.myForm;
    expect(form.valid).toBeFalsy();
    const formValues: Object = {
      'name': 'John',
      'password': 'password',
      'passwordConfirm': 'password'
    }
    form.setValue(formValues);
    expect(form.valid).toBeTruthy();
  })
  it('should test input validity', () => {
    const controls: string[] = [
      "name",
      "password",
      "passwordConfirm"
    ]
    const inputs: Set<AbstractControl> = new Set<AbstractControl>();
    controls.forEach((singleControl: string) => {
      inputs.add(component.myForm.controls[singleControl]);
    })
    inputs.forEach((input: AbstractControl) => {
      expect(input.valid).toBeFalsy();
    })
    inputs.forEach((input: AbstractControl) => {
      input.setValue("allfieldsvalid");
      expect(input.valid).toBeTruthy();
    })
  })
  it('should render input elements', () => {
    const controls: string[] = [
      "name",
      "password",
      "passwordConfirm",
      "btn"
    ]
    const elements: Set<DebugElement> = new Set<DebugElement>();
    controls.forEach((singleControl: string) => {
      const compiled = fixture.debugElement;
      elements.add(compiled);
      const input = compiled.nativeElement.querySelector(`input[id=${singleControl}]`);
      expect(input).toBeTruthy();
    })
  });

  it('should navigate to login', fakeAsync(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.navigate(['login']);
    tick();
    expect(location.path()).toEqual('/login');
  }));

});
