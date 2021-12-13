import {Injectable} from '@angular/core';
import {HttpClientService, Type} from "./http-client.service";
import {Observable, of} from "rxjs";
import {Member} from "../model/Member";
import {map} from "rxjs/operators";
import {HttpParams} from "@angular/common/http";
import {UserParams} from "../model/UserParams";
import {PaginationResult} from "../model/Pagination";

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private members: Member[] = [];
  private _userParams:UserParams;

  memberCache = new Map()


  constructor(private httpClientService : HttpClientService) {
    this._userParams = new UserParams();
  }

  getMember(username: string | null): Observable<Member> {
    let members = [...this.memberCache.values()]// Lấy key của cache --> Mảng dữ liệu
      .reduce((array, element) => array.concat(element.result), [])
      .find((member:Member) => member.userName==username); // merge mảng, với giá trị khởi tạo là []
    console.log(members)

    if(members) return of(members);

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

  addLike(username: string): Observable<string>{
    return this.httpClientService.request(Type.post,'like/'+username, {});
  }

  getLike(predicate: string, pageNumber: number, pageSize: number): Observable<PaginationResult<Member[]>>{
    // return this.httpClientService.request(Type.get,'like?predicate='+predicate )
    let options;
    let params = new HttpParams();
    params = params.append('predicate', predicate)
    params = params.append('pageNumber', pageNumber);
    params = params.append('pageSize', pageSize);

    options  = {
      observe: 'response',
      params
    };

    return this.httpClientService.request<PaginationResult<Member>[]>(Type.get, 'like',{},options).pipe(map(response=>{
      return response;
    }));
  }

  get userParams(): UserParams {
    return this._userParams;
  }

  set userParams(value: UserParams) {
    this._userParams = value;
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

  resetUserParams() {
    return new UserParams();
  }
}
