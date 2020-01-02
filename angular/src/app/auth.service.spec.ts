import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JwtResponse } from './jwt-response';
import { Login } from './login';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
  it('should return JwtResponse', () => {
    const fakeResponse: JwtResponse = {
      jwt: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU3Njc5MTQ2MywiaWF0IjoxNTc2NzU1NDYzfQ.r7wtqfAnlhR3-SkBSB08Pm2qI-eo5Uj_zTdD2TaY2nc"
    }
    const service: AuthService = TestBed.get(AuthService);
    const controller: HttpTestingController = TestBed.get(HttpTestingController);
    const fakeLogin: Login = {
      email: "John@gmail.com",
      password: "password"
    }
    service.login(fakeLogin).subscribe(
      (jwtResponse: JwtResponse) => {
        expect(jwtResponse).toEqual(fakeResponse);
      }
    )
    const req = controller.expectOne('http://localhost:8080/user-portal/login');
    expect(req.request.method).toEqual('POST');
    req.flush(fakeResponse);
  })
});
