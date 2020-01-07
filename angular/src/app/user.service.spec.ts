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
  const test = (url: string, method: string, response: any) => {
    const req = controller.expectOne(url);
    expect(req.request.method).toEqual(method);
    expect(req.request.headers.has("Authorization"));
    req.flush(response);
  }
  beforeEach(() => {
    api_url = 'http://localhost:8080/users/';
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
      imports: [HttpClientTestingModule]
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

  it('should get list of users and have authorization header', () => {
    service.getAll().subscribe(
      (users: User[]) => {
        expect(users).toEqual(mockUsers);
      }
    )
    test(api_url, 'GET', mockUsers);
  });
  it("should post new user and have authorization header", () => {
    requestBody = {
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
    test(api_url, 'POST', requestBody);
  });
  it("should return user by id and have authorization header", () => {
    service.getUserById(1).subscribe(
      (user: User) => {
        expect(user).toEqual(getById(1))
      }
    )
    const getById = (id: number): User => {
      return mockUsers.find((user: User) => user.id == id);
    }
    test(api_url + 1, 'GET', getById(1));
  });
  it('should delete user and have authorization header', () => {
    service.deleteUser(1).subscribe(
      (message: String) => {
        expect(message).toEqual("Deleted");
      }
    )
    test(api_url + 1, 'DELETE', 'Deleted');
  });

  it("should update user and have authorization header", () => {
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
    test(`${api_url}${edit.id}`, 'PUT', edit);
  })
});
