import {Component, Input, OnInit, Output,EventEmitter} from '@angular/core';
import {User} from "../core/model/User";
import {AccountService} from "../core/services/account.service";
import {Member} from "../core/model/Member";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PresenceService} from "../core/services/presence.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() userFromHome!: Member[];
  @Output() cancelRegister = new EventEmitter()
  model = {
    username: "",
    password: ""
  };
  registerForm!: FormGroup;
  maxDate!: Date;

  constructor(private accountService: AccountService, private formBuilder: FormBuilder, private presenceService: PresenceService) { }

  ngOnInit(): void{
    this.initializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  register() {
    this.accountService.register(this.registerForm.value).subscribe((user: User) => {
      if (user) {
        this.accountService.createSessionUser(user)
        alert("Đăng ký thành công")
        this.presenceService.createHubConnection(user);
        this.cancel()
      }
    });
  }

  cancel() {
    this.cancelRegister.emit(false)
  }

  private initializeForm() {
    this.registerForm = this.formBuilder.group({
      username: this.formBuilder.control("", Validators.required),
      password: this.formBuilder.control("", [Validators.required, Validators.minLength(3), Validators.maxLength(8)]),
      confirmPassword: this.formBuilder.control("", [Validators.required, this.matchValues('password')]),
      gender: ['male'],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
    })
    this.registerForm.controls.password.valueChanges.subscribe(() => {
      this.registerForm.controls.confirmPassword.updateValueAndValidity()
    });
  }

  private matchValues(password: string) {
    return (control: AbstractControl) => {
      // @ts-ignore
      return control?.value === control?.parent?.controls[password].value ? null : {isMatching: true}
    }
  }
  getControl(control: string){
    return this.registerForm.controls[control] as FormControl;
  }

}
