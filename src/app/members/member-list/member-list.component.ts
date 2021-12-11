import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {AccountService} from "../../core/services/account.service";
import {MemberService} from "../../core/services/member.service";
import {Member} from "../../core/model/Member";
import {Pagination, PaginationResult} from "../../core/model/Pagination";
import {PageChangedEvent} from "ngx-bootstrap/pagination";
import {UserParams} from "../../core/model/UserParams";

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],

})
export class MemberListComponent implements OnInit, OnDestroy {
  private Subscription!: Subscription;
  member$!: Observable<Member[]>;
  members: Member[] = [];
  pagination!: Pagination;
  userParams = new UserParams();

  constructor(private accountService: AccountService, private memberService: MemberService) { }

  ngOnInit(): void {
      // this.member$ = this.memberService.getMemberList(2,10);
    this.loadMembers();
  }

  ngOnDestroy(): void {
  }

  private loadMembers() {
    this.memberService.getMemberList(this.userParams).subscribe((result: PaginationResult<Member[]>) => {
       this.members = result.result;
       this.pagination = result.pagination
    });
  }

  pageChange($event: PageChangedEvent) {
    this.userParams.pageNumber = $event.page;
    this.loadMembers();
  }
}
