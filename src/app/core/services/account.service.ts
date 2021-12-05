import {Injectable} from '@angular/core';
import {HttpClientService, Type} from "./http-client.service";
import {User} from "../model/User";
import {Router} from "@angular/router";
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private action = "user/login";
  isLogin = false;

  constructor(protected httpClientService: HttpClientService) { }

  login(model: {}, router: Router, initUserCallBack: () => void): void{
    this.httpClientService.request(Type.post,this.action,model).subscribe((user: User) => {
      this.createSessionUser(user)
      initUserCallBack();
      router.navigateByUrl("/members").then(r => r)
    });
  }

  logout() {
    this.isLogin = false;
    localStorage.removeItem("user")
  }

  hasLogin() {
    return JSON.parse(<string>localStorage.getItem("user")) as User;
  }

  getUserList() {
    return this.httpClientService.request(Type.get, 'user');
  }

  register(model: { password: string; username: string }) {
    return this.httpClientService.request(Type.post,'User/Register',model);
  }

    createSessionUser(user: User) {
    this.isLogin = true
    localStorage.setItem("user", JSON.stringify(user));
  }

}
