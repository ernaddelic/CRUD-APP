import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes, Router } from '@angular/router';
import { UsersComponent } from '../users/users.component';
import { LoginComponent } from '../login/login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let router: Router;
  let location: Location;
  const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: "user-list", component: UsersComponent}
  ]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        LoginComponent,
        UsersComponent,
        MenuComponent
      ],
      imports: [ 
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule, 
        RouterTestingModule.withRoutes(routes)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
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

  it('should navigate to login', fakeAsync(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.navigate(['login']);
    tick();
    expect(location.path()).toEqual('/login');
  }));
});
