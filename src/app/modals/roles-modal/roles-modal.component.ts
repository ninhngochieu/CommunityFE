import { EventEmitter } from '@angular/core';
import {Component, Input, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {User} from "../../core/model/User";
import {AccountService} from "../../core/services/account.service";

@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrls: ['./roles-modal.component.css']
})
export class RolesModalComponent implements OnInit {

  @Input() updateSelectedRoles = new EventEmitter()
  member!: User;
  roles!: any[];
  user: User;

  constructor(public bsModalRef: BsModalRef, private  accountService: AccountService) {
    this.user = accountService.hasLogin();
  }

  ngOnInit(): void {
  }

  updateRoles(){
    console.log(this.roles)
    this.updateSelectedRoles.emit(this.roles);
    this.bsModalRef.hide();
  }
}
