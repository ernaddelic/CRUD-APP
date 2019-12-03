import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from './user';

describe('UserService', () => {
  let api_url: string;
  let mockUsers: User[];
  beforeEach(() => {
    api_url = 'http://localhost:8080/user-portal/users/';
    mockUsers = [
      {
        id: 1,
        firstName: "John",
        lastName: "Smith",
        age: 33
      },
      {
        id: 2,
        firstName: "Nate",
        lastName: "Handry",
        age: 21
      },
      {
        id: 3,
        firstName: "Tim",
        lastName: "Johnson",
        age: 27 
      }
    ]
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
  });

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('should get list of users', () => {
    const service: UserService = TestBed.get(UserService);
    const controller: HttpTestingController = TestBed.get(HttpTestingController);
    service.getAll().subscribe(
      (users: User[]) => {
        expect(users).toEqual(mockUsers);
      }
    )
    const req = controller.expectOne(api_url);
    expect(req.request.method).toEqual('GET');
    req.flush(mockUsers);
  })
});
