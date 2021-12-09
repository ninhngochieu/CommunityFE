import { Component } from '@angular/core';
import {AccountService} from "./core/services/account.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontend';

  constructor(private accountService: AccountService) {
    this.accountService.userSubject.next(this.accountService.hasLogin())
  }
}
