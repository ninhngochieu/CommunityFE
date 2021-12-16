import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AccountService} from "../services/account.service";
import {User} from "../model/User";

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit{
  @Input()
  appHasRole!: string[];
  private readonly user: User;

  constructor(private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<any>, private accountService: AccountService) {
    this.user = this.accountService.hasLogin();
  }

  ngOnInit(): void {
    if(!this.user?.roles || this.user == null){
      console.log(1)
      this.viewContainerRef.clear();
      return;
    }
    if (this.user?.roles.some(r=>this.appHasRole.includes(r))){
      console.log(2)
      this.viewContainerRef.createEmbeddedView(this.templateRef)
    }else {
      console.log(3)
      this.viewContainerRef.clear();
    }
  }

}
