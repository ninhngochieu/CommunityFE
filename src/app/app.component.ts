import { Component } from '@angular/core';
import {AccountService} from "./core/services/account.service";
import {PresenceService} from "./core/services/presence.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontend';

  constructor(private accountService: AccountService, private presenceService: PresenceService) {
    let user = this.accountService.hasLogin();
    this.accountService.userSubject.next(user)
    this.presenceService.createHubConnection(user);
  }
}
