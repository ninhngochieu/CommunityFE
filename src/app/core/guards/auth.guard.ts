import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AccountService} from "../services/account.service";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private AUTH_ERROR = "Bạn phải đăng nhập để có thể xem nội dung này";

  constructor(private accountService: AccountService,private toastrService: ToastrService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if(this.accountService.hasLogin()){
      return true
    }
    this.toastrService.error(this.AUTH_ERROR)
    return false;
  }

}
