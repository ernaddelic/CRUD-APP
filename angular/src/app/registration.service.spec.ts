import { TestBed, inject } from '@angular/core/testing';
import { RegistrationService } from './registration.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Registration } from './registration';

describe('RegistrationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: RegistrationService = TestBed.get(RegistrationService);
    expect(service).toBeTruthy();
  });

  it('should save user to database', inject(
    [RegistrationService, HttpTestingController], 
    (service: RegistrationService, controller: HttpTestingController) => {
      let fakeUser: Registration = {
        name: "user",
        email: "user@gmail.com",
        password: "password",
        passwordConfirm: "password"
      }
      let fakeResonse: string = "User Registered";
      service.registerUser(fakeUser).subscribe(
        (response: string) => {
          expect(response).toEqual(fakeResonse);
        })
        const req = controller.expectOne('http://localhost:8080/register');
        expect(req.request.method).toEqual('POST');
        req.flush(fakeResonse);
    }
  ))
});
