import { TestBed, inject } from '@angular/core/testing';

import { RegistrationService } from './registration.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Registration } from './registration';

describe('RegistrationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [RegistrationService]
  }));

  it('should be created', () => {
    const service: RegistrationService = TestBed.get(RegistrationService);
    expect(service).toBeTruthy();
  });
  it('should return string message', inject(
    [RegistrationService], (service: RegistrationService) => {
      const controller: HttpTestingController = TestBed.get(HttpTestingController);
      let fakeUser: Registration = {
        name: "user",
        password: "password",
        passwordConfirm: "password"
      }
      let fakeResonse: string = "User Registered";
      service.registerUser(fakeUser).subscribe(
        (response: string) => {
          expect(response).toEqual(fakeResonse);
        })
        const req = controller.expectOne('http://localhost:8080/user-portal/register');
        expect(req.request.method).toEqual('POST');
        req.flush(fakeResonse);
    }
  ))
});
