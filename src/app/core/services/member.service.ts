import {Injectable} from '@angular/core';
import {HttpClientService, Type} from "./http-client.service";
import {Observable, of} from "rxjs";
import {Member} from "../model/Member";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private members: Member[] = [];

  constructor(private httpClientService : HttpClientService) { }

  getMember(username: string | null): Observable<Member> {
    let member = this.members.find(x=>x.userName === username);
    if (member!==undefined) return of(member);
    return this.httpClientService.request(Type.get, 'user/'+username);
  }

  updateMember(member: Member): Observable<Member> {
    return this.httpClientService.request(Type.put, 'user', member).pipe(
      map(m=>{
        const index = this.members.indexOf(member);
        this.members[index] = member;
        return m;
      })
    );
  }

  getMemberList() {
    if(this.members.length > 0) return of(this.members)
    return this.httpClientService.request(Type.get, 'user').pipe(
      map(m=> {
        this.members = m;
        return m;
      })
    );
  }

  setMainPhoto(id: number) : Observable<void>{
    return this.httpClientService.request(Type.put, 'user/set-main-photo/'+id)
  }
}
