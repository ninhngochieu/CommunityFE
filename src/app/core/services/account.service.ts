import {Injectable} from '@angular/core';
import {HttpClientService, Type} from "./http-client.service";
import {User} from "../model/User";
import {Router} from "@angular/router";
import {ReplaySubject} from 'rxjs';
import {MemberService} from "./member.service";
import {PresenceService} from "./presence.service";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private action = "user/login";
  isLogin = false;
  userSubject = new ReplaySubject<User>(1);

  constructor(protected httpClientService: HttpClientService, private memberService: MemberService, private presenceService: PresenceService) { }

  login(model: {}, router: Router, initUserCallBack: () => void): void{
    this.httpClientService.request(Type.post,this.action,model).subscribe((user: User) => {
      user.roles = this.getRoles(user);
      this.createSessionUser(user)
      // this.userSubject.next(user);
      this.presenceService.createHubConnection(user);
      initUserCallBack();
      router.navigateByUrl("/members").then(r => r)
    });
  }

  createSessionUser(user: User) {
    this.isLogin = true
    localStorage.setItem("user", JSON.stringify(user));
    this.userSubject.next(user)
  }

  logout() {
    this.isLogin = false;
    localStorage.removeItem("user")
    this.memberService.memberCache.clear();
    this.presenceService.stopConnection();
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

  getDecodedToken(token: string){ // Get Payload
    return JSON.parse(atob(token.split(".")[1]))
  }

  private getRoles(user: User) {
    let role = this.getDecodedToken(user.token).role;
    user.roles = [];
    if (typeof role === "string"){
      user.roles.push(role);
    }else {
      user.roles.push(...role)
    }
    // console.log(user.roles)
    return user.roles;
  }
}
