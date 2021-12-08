import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import {AccountService} from "../../core/services/account.service";

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],

})
export class MemberListComponent implements OnInit, OnDestroy {
  members = [];
  private Subscription!: Subscription;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    if (this.members.length == 0) {
      this.Subscription = this.accountService.getUserList().subscribe(m => {
        this.members = m;
      })
    }
  }

  ngOnDestroy(): void {
    this.Subscription.unsubscribe()
  }

}
