import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../core/services/admin.service";
import {User} from "../../core/model/User";
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {RolesModalComponent} from "../../modals/roles-modal/roles-modal.component";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  private bsModalRef!: BsModalRef<RolesModalComponent>;

  constructor(private adminService: AdminService, private bsModalService: BsModalService) { }

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  getUsersWithRoles(){
    this.adminService.getUsersWithRoles().subscribe(user => {
      this.users = user;
    });
  }

  openRolesModal(user: User) {
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        user,
        roles: this.getRoleArray(user)
      }
    }
    console.log(this.getRoleArray(user))
    this.bsModalRef = this.bsModalService.show(RolesModalComponent, config);
    this.bsModalRef.content?.updateSelectedRoles.subscribe(values => {
      // console.log(values)
      const rolesToUpdate = {
        roles: [...values.filter((l:any)=>l.checked === true).map((l:any)=>l.name)]
      }
      if(rolesToUpdate){
        this.adminService.updateRoles(user.username, rolesToUpdate.roles).subscribe(()=> {
          user.roles = [...rolesToUpdate.roles]
        });
      }
    });
  }

  private getRoleArray(user: User) {
    const roles: any[] = []
    const userRoles = user.roles;
    const availableRoles: any[] = [
      {name: 'Admin', value: 'Admin'},
      {name: 'Moderator', value: 'Moderator'},
      {name: 'Member', value: 'Member'},
    ]

    availableRoles.forEach(role => {
      let isMatch = false;
      for (const userRole of userRoles) { // Quét qua tất cả các role, gặp role nào thì đánh true, rồi thêm. Không gặp thì vẫn thêm nhưng đánh false
        if (role.name === userRole){
          isMatch = true
          role.checked = true
          roles.push(role)
          break;
        }
      }
      if (!isMatch){
        role.checked = false
        roles.push(role)
      }
    })
    return roles;
  }
}
