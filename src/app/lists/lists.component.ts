import { Component, OnInit } from '@angular/core';
import {Member} from "../core/model/Member";
import {MemberService} from "../core/services/member.service";
import {Pagination, PaginationResult} from "../core/model/Pagination";
import {PageChangedEvent} from "ngx-bootstrap/pagination";

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  predicate = "liked";
  members: Member[] = [];
  private pageNumber = 1;
  private pageSize = 5;
  pagination!: Pagination;
  constructor(private memberService: MemberService) { }

  ngOnInit(): void {
    this.loadLikes()
  }

  loadLikes() {
    console.log(this.predicate)
    this.memberService.getLike(this.predicate,this.pageNumber,this.pageSize).subscribe((res) => {
      this.members = res.result;
      this.pagination = res.pagination;
    });
  }


  pageChange($event: PageChangedEvent) {
    this.pageNumber = $event.page;
    this.loadLikes();
  }
}
