import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Member} from "../model/Member";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {MemberService} from "../services/member.service";

@Injectable({
  providedIn: "root"
})
export class MemberDetailResolver implements Resolve<Member>{

  constructor(private memberService: MemberService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Member>{
    // console.log(route.paramMap.get("username"))
    return this.memberService.getMember(route.paramMap.get("username"))
  }

}
