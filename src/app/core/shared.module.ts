import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {ToastrModule} from "ngx-toastr";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {ButtonsModule} from "ngx-bootstrap/buttons";
import {TimeagoModule} from "ngx-timeago";



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    TimeagoModule.forRoot()
  ],
  exports:[
    HttpClientModule,
    BsDropdownModule,
    ToastrModule,
    BsDatepickerModule,
    PaginationModule,
    ButtonsModule,
    TimeagoModule
  ]
})
export class SharedModule { }
