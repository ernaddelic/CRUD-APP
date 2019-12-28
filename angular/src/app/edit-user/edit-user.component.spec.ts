import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { EditUserComponent } from './edit-user.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, Routes } from '@angular/router';
import { UsersComponent } from '../users/users.component';
import { Location } from '@angular/common';
import { User } from '../user';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { SearchPipe } from '../search.pipe';

describe('EditUserComponent', () => {
  let component: EditUserComponent;
  let fixture: ComponentFixture<EditUserComponent>;
  let router: Router;
  let location: Location;
  const routes: Routes = [
    {path: 'user-list', component: UsersComponent}
  ]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        EditUserComponent, 
        UsersComponent,
        SearchPipe 
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserComponent);
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
      id: 1,
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
    expect(idInput.valid).toBeFalsy();
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

  it('should put and return user',  () => {
    const mockUser: User = {
      id: 1,
      firstName: "Tim",
      lastName: "Handry",
      age: 30
    }
    let controller: HttpTestingController = TestBed.get(HttpTestingController);
    component.service.editUser(mockUser).subscribe(
      (data: User) => {
        expect(data).toEqual(mockUser);
      }
    )
    const req = controller.expectOne(`http://localhost:8080/user-portal/users/${mockUser.id}`);
    expect(req.request.method).toEqual('PUT');
    req.flush(mockUser);
  })
});
