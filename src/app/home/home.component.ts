import { Component, OnInit } from '@angular/core';
import {User} from "../core/model/User";
import {AccountService} from "../core/services/account.service";
import {Member} from "../core/model/Member";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public isRegister: boolean = false;
  users!: Member[];
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  showRegisterForm() {
    this.isRegister = !this.isRegister;
  }

  private getUsers() {
    this.accountService.getUserList().subscribe((users: Member[]) => {
      this.users = users;
      console.log(users)
    });
  }

  cancelRegisterHome($event: any) {
    this.isRegister = $event;
  }
}
