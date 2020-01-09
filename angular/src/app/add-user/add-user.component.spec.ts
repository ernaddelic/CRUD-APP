import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AddUserComponent } from './add-user.component';
import { FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, Routes } from '@angular/router';
import { UsersComponent } from '../users/users.component';
import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { User } from '../user';
import { MaterialModule } from '../material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
  let router: Router;
  let location: Location;
  const routes: Routes = [
    {path: 'user-list', component: UsersComponent}
  ]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        AddUserComponent,
        UsersComponent 
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        BrowserAnimationsModule
      ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should navigate to users', fakeAsync(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.navigate(['user-list']);
    tick();
    expect(location.path()).toEqual('/user-list');
  }));
  it('should test form validity', () => {
    const form = component.formGroup;
    expect(form.valid).toBeFalsy();
    const formValue: User = {
      fullName: "Nate",
      email: "nate@gmail.com",
      mobile: "23323322",
      city: "London",
      gender: "male",
      hireDate: new Date(),
      isPermanent: true
    }
    form.setValue(formValue);
    expect(form.valid).toBeTruthy();
  })
  it('should test input validity', () => {
    const form = component.formGroup;
    const controls: string[] = [
      "fullName",
      "email",
      "mobile",
      "city",
      "gender",
    ];
    const inputs: Set<AbstractControl> = new Set<AbstractControl>();
    const isPermanent: AbstractControl = component.formGroup.controls['isPermanent'];
    isPermanent.setValue(true);
    expect(isPermanent.valid).toBeTruthy();
    
    controls.forEach((singleControl: string) => {
      inputs.add(form.controls[singleControl]);
    })
    inputs.forEach((item: AbstractControl) => {
      item.setValue("valid@hotmail.com");
      expect(item.valid).toBeTruthy();
    })
  })
});
