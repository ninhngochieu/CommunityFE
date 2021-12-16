import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isManager'
})
export class IsManagerPipe implements PipeTransform {

  transform(roles: string[], inputRole: string): boolean {
    let isAdmin = roles.includes('Admin');

    if (isAdmin) {
      return isAdmin;
    }
    if (inputRole == 'Moderator') {
      return true
    }
    return inputRole == 'Member';

  }


}
