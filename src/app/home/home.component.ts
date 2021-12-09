import { Component, OnInit } from '@angular/core';
import {User} from "../core/model/User";
import {AccountService} from "../core/services/account.service";
import {Member} from "../core/model/Member";
import {MemberService} from "../core/services/member.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public isRegister: boolean = false;
  users!: Member[];
  constructor(private accountService: AccountService, private memberService: MemberService) { }

  ngOnInit(): void {
  }

  showRegisterForm() {
    this.isRegister = !this.isRegister;
  }
  cancelRegisterHome($event: any) {
    this.isRegister = $event;
  }
}
