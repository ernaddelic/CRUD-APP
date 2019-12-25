import { Pipe, PipeTransform } from '@angular/core';
import { User } from './user';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(users: User[], text: string): User[] {
    if (text == null || text == '') {
      return users;
    }
    let filtered = users.filter((user: User) => {
      return user.firstName.trim().toLowerCase()
      .includes(text.trim().toLowerCase()) || 
      user.lastName.trim().toLowerCase()
      .includes(text.trim().toLowerCase());
    })
    return filtered;
  }

}
