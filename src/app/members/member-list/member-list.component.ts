import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {AccountService} from "../../core/services/account.service";
import {MemberService} from "../../core/services/member.service";
import {Member} from "../../core/model/Member";

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],

})
export class MemberListComponent implements OnInit, OnDestroy {
  private Subscription!: Subscription;
  member$!: Observable<Member[]>;

  constructor(private accountService: AccountService, private memberService: MemberService) { }

  ngOnInit(): void {
      this.member$ = this.memberService.getMemberList();
  }

  ngOnDestroy(): void {
  }

}
