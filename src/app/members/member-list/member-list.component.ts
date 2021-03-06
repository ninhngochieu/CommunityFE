import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {AccountService} from "../../core/services/account.service";
import {MemberService} from "../../core/services/member.service";
import {Member} from "../../core/model/Member";
import {Pagination, PaginationResult} from "../../core/model/Pagination";
import {PageChangedEvent} from "ngx-bootstrap/pagination";
import {UserParams} from "../../core/model/UserParams";
import {User} from "../../core/model/User";

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
  userParams;
  genderList = [
    {value: 'male', display: 'Male'},
    {value: 'female', display: 'Female'},
    {value: 'all', display: 'All'}
  ]

  constructor(private accountService: AccountService, private memberService: MemberService) {
    this.userParams = this.memberService.userParams;
  }

  ngOnInit(): void {
      // this.member$ = this.memberService.getMemberList(2,10);
    this.loadMembers();
  }

  ngOnDestroy(): void {
  }

  loadMembers() {
    this.memberService.userParams = this.userParams;
    this.memberService.getMemberList(this.userParams).subscribe((result: PaginationResult<Member[]>) => {
       this.members = result.result;
       this.pagination = result.pagination
    });
  }

  pageChange($event: PageChangedEvent) {
    this.userParams.pageNumber = $event.page;
    this.memberService.userParams.pageNumber = $event.page;
    this.loadMembers();
  }

  resetFilter(){
    this.userParams = this.memberService.resetUserParams();
    this.loadMembers();
  }
}
