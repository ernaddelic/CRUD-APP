import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes, Router } from '@angular/router';
import { UsersComponent } from '../users/users.component';
import { Location } from '@angular/common';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let location: Location;
  const routes: Routes = [
    {path: 'user-list', component: UsersComponent}
  ]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent, UsersComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule.withRoutes(routes)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to user-list', fakeAsync(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.navigate(['user-list']);
    tick();
    expect(location.path()).toEqual('/user-list');
  }))

  it('should test form validity', () => {
    const form = component.formGroup;
    expect(form.valid).toBeFalsy();
    const formValue: Object = {
      name: "John",
      password: "password"
    }
    form.setValue(formValue);
    expect(form.valid).toBeTruthy();
  })
  it('should test input validity', () => {
    const controls: string[] = [
      "name",
      "password",
    ]
    const inputs: Set<AbstractControl> = new Set<AbstractControl>();
    controls.forEach((singleControl: string) => {
      inputs.add(component.formGroup.controls[singleControl]);
    })
    inputs.forEach((input: AbstractControl) => {
      expect(input.valid).toBeFalsy();
    })
    inputs.forEach((input: AbstractControl) => {
      input.setValue("valid");
      expect(input.valid).toBeTruthy();
    })
  })
});
