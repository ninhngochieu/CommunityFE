import { Injectable } from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class WaitingService {
  private requestCount = 0;

  constructor(private ngxSpinnerService: NgxSpinnerService) { }


  waiting() {
    this.requestCount++;
    this.ngxSpinnerService.show(undefined, {
      type: 'line-scale-party',
      bdColor: 'rgba(255,255,255,0)',
      color: "#333333"
    })
  }

  finish() {
    this.requestCount --;
    if (this.requestCount <=0){
      this.requestCount = 0
      this.ngxSpinnerService.hide()
    }
  }
}
