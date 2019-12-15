import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserComponent } from './add-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../user.service';
//import {routes} from '../app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Route } from '@angular/router';
import { UsersComponent } from '../users/users.component';


describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
  const routes: Route[] = [
    {path: 'user-list', component: UsersComponent}
  ]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserComponent, UsersComponent ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule.withRoutes(routes)
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
});
