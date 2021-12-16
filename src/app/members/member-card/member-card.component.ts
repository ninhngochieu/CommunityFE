import {Component, Input, OnInit} from '@angular/core';
import {Member} from "../../core/model/Member";
import {MemberService} from "../../core/services/member.service";
import {ToastrService} from "ngx-toastr";
import {PresenceService} from "../../core/services/presence.service";

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input()
  member!: Member;
  constructor(private memberService: MemberService, private toastService: ToastrService, public presenceService: PresenceService) { }

  ngOnInit(): void {

  }


  addLike(member: Member) {
    this.memberService.addLike(member.userName).subscribe(res=> {
      this.toastService.success(res + " " + member.knownAs)
    })
  }
}
