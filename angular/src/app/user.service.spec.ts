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
        fullName: "John Smith",
        email: "john@gmail.com",
        mobile: "233-233",
        city: "London",
        gender: "male",
        hireDate: new Date(),
        isPermanent: true
      },
      {
        id: 2,
        fullName: "Nate Murray",
        email: "nate@gmail.com",
        mobile: "233-233",
        city: "London",
        gender: "female",
        hireDate: new Date(),
        isPermanent: false
      },
      {
        id: 3,
        fullName: "Tim Handry",
        email: "tim@gmail.com",
        mobile: "233-233",
        city: "Paris",
        gender: "male",
        hireDate: new Date(),
        isPermanent: false 
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
        id: 2,
        fullName: "Nate Murray",
        email: "nate@gmail.com",
        mobile: "233-233",
        city: "London",
        gender: "female",
        hireDate: new Date(),
        isPermanent: false
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
        id: 2,
        fullName: "Nate Murray",
        email: "nate@gmail.com",
        mobile: "233-233",
        city: "London",
        gender: "female",
        hireDate: new Date(),
        isPermanent: false
    }
    service.editUser(edit).subscribe(
      (user: User) => {
        expect(user).toEqual(edit);
      }
    )
    test(`${api_url}${edit.id}`, 'PUT', edit);
  })
});
