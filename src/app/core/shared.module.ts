import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {ToastrModule} from "ngx-toastr";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {ButtonsModule} from "ngx-bootstrap/buttons";
import {TimeagoModule} from "ngx-timeago";
import { IsManagerPipe } from './pipes/is-manager.pipe';


@NgModule({
  declarations: [

    IsManagerPipe
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
    exports: [
        HttpClientModule,
        BsDropdownModule,
        ToastrModule,
        BsDatepickerModule,
        PaginationModule,
        ButtonsModule,
        TimeagoModule,
        IsManagerPipe
    ]
})
export class SharedModule { }
