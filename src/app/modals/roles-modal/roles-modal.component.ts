import { EventEmitter } from '@angular/core';
import {Component, Input, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {User} from "../../core/model/User";

@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrls: ['./roles-modal.component.css']
})
export class RolesModalComponent implements OnInit {

  @Input() updateSelectedRoles = new EventEmitter()
  user!: User;
  roles!: any[];
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  updateRoles(){
    console.log(this.roles)
    this.updateSelectedRoles.emit(this.roles);
    this.bsModalRef.hide();
  }
}
