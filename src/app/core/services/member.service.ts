import {Injectable} from '@angular/core';
import {HttpClientService, Type} from "./http-client.service";
import {Observable, of} from "rxjs";
import {Member} from "../model/Member";
import {map} from "rxjs/operators";
import {PaginationResult} from "../model/Pagination";
import {HttpParams} from "@angular/common/http";
import {UserParams} from "../model/UserParams";

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private members: Member[] = [];
  memberCache = new Map()

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

  getMemberList(userParams: UserParams) {
    let response = this.memberCache.get(Object.values(userParams).join("-"));
    if (response){
      return of(response)
    }

    let options;
    let params = new HttpParams();
    params = params.append('pageNumber', userParams.pageNumber.toString() );
    params = params.append('pageSize', userParams.pageSize.toString())
    params = params.append('gender', userParams.gender);
    params = params.append('minAge', userParams.minAge);
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('orderBy', userParams.orderBy)

    options  = {
      observe: 'response',
      params
    };

    return this.httpClientService.request<Member[]>(Type.get, 'user',{},options).pipe(map(response=>{
      this.memberCache.set(Object.values(userParams).join("-"),response);
      return response;
    }));
  }

  setMainPhoto(id: number) : Observable<void>{
    return this.httpClientService.request(Type.put, 'user/set-main-photo/'+id)
  }

  deletePhoto(id: number): Observable<any> {
    return this.httpClientService.request(Type.delete, 'user/delete-photo/'+id);
  }
}
