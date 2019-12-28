import { TestBed, async, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { Router, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UsersComponent } from './users/users.component';
import { Location } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SearchPipe } from './search.pipe';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let location: Location;
  const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: "signup", component: SignUpComponent},
    {path: "user-list", component: UsersComponent}
  ]
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [
        AppComponent,
        LoginComponent,
        SignUpComponent,
        UsersComponent,
        SearchPipe
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
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

  it('should navigate to signup', fakeAsync(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.navigate(['signup']);
    tick();
    expect(location.path()).toEqual('/signup');
  }));
});
