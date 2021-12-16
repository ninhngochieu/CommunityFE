import {Injectable} from '@angular/core';
import {HttpClientService, Type} from "./http-client.service";
import {Observable} from "rxjs";
import {User} from "../model/User";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClientService: HttpClientService) { }

  getUsersWithRoles(): Observable<User[]>{
    return this.httpClientService.request(Type.get, 'Admin/Users-With-Roles');
  }

  updateRoles(username: string, roles: string[]): Observable<any> {
    console.log(roles)
    return this.httpClientService.request(Type.post, 'Admin/Edit-Roles/'+username+'?roles='+ roles )
  }
}
