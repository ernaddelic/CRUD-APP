import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { UsersComponent } from './users.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../app-routing.module';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { SearchPipe } from '../search.pipe';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        UsersComponent, 
        EditUserComponent,
        AddUserComponent,
        SignUpComponent,
        LoginComponent,
        SearchPipe
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule,
        FormsModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should navigate to add-user', fakeAsync(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.navigate(['add-user']);
    tick();
    expect(location.path()).toBe("/add-user");
  }))
  it('should navigate to edit-user', fakeAsync(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.navigate(['edit-user']);
    tick();
    expect(location.path()).toBe("/edit-user");
  }))
});
