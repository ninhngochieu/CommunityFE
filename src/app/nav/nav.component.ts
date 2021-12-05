import { Component, OnInit } from '@angular/core';
import {AccountService} from "../core/services/account.service";
import {map} from "rxjs/operators";
import {User} from "../core/model/User";
import {Router} from "@angular/router";
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model = {
    username: '',
    password: '',

  };
  username = "";

  constructor(public accountService: AccountService, private router:Router) { }

  ngOnInit(): void {
    this.initUser();
  }

  login() {
    this.accountService.login(this.model, this.router, () => this.initUser())

  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl("/").then(r => r)
  }

  private initUser() {
    let user = this.accountService.hasLogin();
    if(user){
      this.accountService.isLogin = true;
      this.username = user.username
    }
  }
}
