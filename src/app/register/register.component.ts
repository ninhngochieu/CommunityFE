import {Component, Input, OnInit, Output,EventEmitter} from '@angular/core';
import {User} from "../core/model/User";
import {AccountService} from "../core/services/account.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() userFromHome!: User[];
  @Output() cancelRegister = new EventEmitter()
  model = {
    username: "",
    password: ""
  };

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  register() {
    console.log(this.model)
    this.accountService.register(this.model).subscribe((user: User) => {
      if (user) {
        this.accountService.createSessionUser(user)
        alert("Đăng ký thành công")
        this.cancel()
      }
    });
  }

  cancel() {
    this.cancelRegister.emit(false)
  }
}
