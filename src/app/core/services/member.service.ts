import {Injectable} from '@angular/core';
import {HttpClientService, Type} from "./http-client.service";
import {Observable} from "rxjs";
import {Member} from "../model/Member";

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private httpClientService : HttpClientService) { }

  getMember(username: string | null): Observable<Member> {
    return this.httpClientService.request(Type.get, 'user/'+username);
  }

  updateMember(value: any): Observable<Member> {
    return this.httpClientService.request(Type.put, 'user', value);
  }
}
