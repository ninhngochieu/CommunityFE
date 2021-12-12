import {Component, Input, OnInit} from '@angular/core';
import {Member} from "../../core/model/Member";
import {MemberService} from "../../core/services/member.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input()
  member!: Member;
  constructor(private memberService: MemberService, private toastService: ToastrService) { }

  ngOnInit(): void {

  }


  addLike(member: Member) {
    this.memberService.addLike(member.userName).subscribe(msg => {
      this.toastService.success(msg + " "+ member.knownAs);
    })
  }
}
