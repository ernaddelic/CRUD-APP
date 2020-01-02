import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AddUserComponent } from './add-user.component';
import { FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, Routes } from '@angular/router';
import { UsersComponent } from '../users/users.component';
import { Location } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from '../user';
import { SearchPipe } from '../search.pipe';
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
        UsersComponent,
        SearchPipe 
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
    const formValue: Object = {
      id: "",
      firstName: "Nate",
      lastName: "Murray",
      age: 23
    }
    form.setValue(formValue);
    expect(form.valid).toBeTruthy();
  })
  it('should test input validity', () => {
    const form = component.formGroup;
    const idInput = form.controls.id;
    expect(idInput.valid).toBeTruthy();
    const controls: string[] = [
      'id',
      'firstName',
      'lastName',
      'age'
    ];
    const inputs: Set<AbstractControl> = new Set<AbstractControl>();
    controls.forEach((singleControl: string) => {
      inputs.add(form.controls[singleControl]);
    })
    inputs.forEach((item: AbstractControl) => {
      item.setValue("valid");
      expect(item.valid).toBeTruthy();
    })
  })
  it('should post and return user',  () => {
    const mockUser: User = {
      id: 1,
      firstName: "Tim",
      lastName: "Handry",
      age: 30
    }
    let controller: HttpTestingController = TestBed.get(HttpTestingController);
    component.service.createUser(mockUser).subscribe(
      (data: User) => {
        expect(data).toEqual(mockUser);
      }
    )
    const req = controller.expectOne('http://localhost:8080/user-portal/users/');
    expect(req.request.method).toEqual('POST');
    req.flush(mockUser);
  })
});
