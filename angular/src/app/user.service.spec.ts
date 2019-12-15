import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from './user';

describe('UserService', () => {
  let api_url: string;
  let mockUsers: User[];
  let requestBody: User;
  let service: UserService;
  let controller: HttpTestingController;
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
    ];
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    })
    service = TestBed.get(UserService);
    controller = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get list of users', () => {
    service.getAll().subscribe(
      (users: User[]) => {
        expect(users).toEqual(mockUsers);
      }
    )
    const req = controller.expectOne(api_url);
    expect(req.request.method).toEqual('GET');
    req.flush(mockUsers);
  });
  it("should post new user and return it", () => {
    const requestBody = {
      id: 4,
      firstName: "Alan",
      lastName: "Andersen",
      age: 19
    };
    service.createUser(requestBody).subscribe(
      (user: User) => {
        expect(user).toEqual(requestBody);
      }
    )
    const req = controller.expectOne(api_url);
    expect(req.request.method).toEqual('POST');
    req.flush(requestBody);
  });
  it("should return user by id", () => {
    service.getUserById(1).subscribe(
      (user: User) => {
        expect(user).toEqual(getById(1))
      }
    )
    const getById = (id: number): User => {
      return mockUsers.find((user: User) => user.id == id);
    }
    const req = controller.expectOne(api_url + 1);
    expect(req.request.method).toEqual('GET');
    req.flush(getById(1));
  });
  it('should delete user and return it', () => {
    service.deleteUser(1).subscribe(
      (message: String) => {
        expect(message).toEqual("Deleted");
      }
    )
    const req = controller.expectOne(api_url + 1);
    expect(req.request.method).toEqual('DELETE');
    req.flush("Deleted");
  });

  it("should update user and return it", () => {
    const edit: User = {
      id: 1,
      firstName: "Ana",
      lastName: "Smith",
      age: 23
    }
    service.editUser(edit).subscribe(
      (user: User) => {
        expect(user).toEqual(edit);
      }
    )
    const req = controller.expectOne(api_url + edit.id);
    expect(req.request.method).toEqual('PUT');
    req.flush(edit);
  })
});
