import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AccountService} from "../services/account.service";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private accountService: AccountService, private toastrService: ToastrService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let user = this.accountService.hasLogin();
    if (user.roles.includes("Admin") || user.roles.includes("Moderator")){
      return true;
    }else {
      this.toastrService.error("Bạn không đủ quyền hạn để truy cập trang này");
      return false;
    }
  }

}
