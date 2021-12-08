import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MemberService} from "../../core/services/member.service";
import {AccountService} from "../../core/services/account.service";
import {User} from "../../core/model/User";
import {Member} from "../../core/model/Member";
import {ToastrService} from "ngx-toastr";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild("formEdit") formEdit!: NgForm;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any){
    if (this.formEdit.dirty){
      $event.returnValue = true
    }
  }

  private readonly user: User;
  member!: Member;
  constructor(private memberService: MemberService, private accountService: AccountService,private toastrService: ToastrService) {
    this.user = this.accountService.hasLogin();
  }

  ngOnInit(): void {
    this.loadMember();
  }

  private loadMember() {
    if (this.user == null)
      return;
    this.memberService.getMember(this.user.username).subscribe(m=>{
      this.member = m;
    })
  }

  updateMember() {
    this.memberService.updateMember(this.formEdit.value).subscribe(m=>{
      this.toastrService.success("Profile update successfully")
      this.formEdit.reset(this.member);
    });
  }
}
