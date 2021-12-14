import {Injectable} from '@angular/core';
import {HttpClientService, Type} from "./http-client.service";
import {User} from "../model/User";
import {Router} from "@angular/router";
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {Member} from "../model/Member";
import {MemberService} from "./member.service";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private action = "user/login";
  isLogin = false;
  userSubject = new ReplaySubject<User>(1);

  constructor(protected httpClientService: HttpClientService, private memberService: MemberService) { }

  login(model: {}, router: Router, initUserCallBack: () => void): void{
    this.httpClientService.request(Type.post,this.action,model).subscribe((user: User) => {
      this.createSessionUser(user)
      this.userSubject.next(user);
      initUserCallBack();
      router.navigateByUrl("/members").then(r => r)
    });
  }

  logout() {
    this.isLogin = false;
    localStorage.removeItem("user")
    this.memberService.memberCache.clear();
  }

  hasLogin() {
    return JSON.parse(<string>localStorage.getItem("user")) as User;
  }
  //
  // getMemberList() {
  //   return this.httpClientService.request(Type.get, 'user');
  // }

  register(model: { password: string; username: string }) {
    return this.httpClientService.request(Type.post,'User/Register',model);
  }

    createSessionUser(user: User) {
    this.isLogin = true
    localStorage.setItem("user", JSON.stringify(user));
    this.userSubject.next(user)
  }

}
