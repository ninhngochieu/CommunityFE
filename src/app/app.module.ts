import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import {ToastrModule} from "ngx-toastr";
import {SharedModule} from "./core/shared.module";
import { NotFoundComponent } from './not-found/not-found.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import {NgxGalleryModule} from "@kolkov/ngx-gallery";
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import {LoadingInterceptor} from "./core/interceptors/loading.interceptor";
import {NgxSpinnerModule} from "ngx-spinner";
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import {FileUploadModule} from "ng2-file-upload";
import {FormInputComponent} from "./core/forms/form-input/form-input.component";
import {FormDateInputComponent} from "./core/forms/form-date-input/form-date-input.component";
import {B} from "@angular/cdk/keycodes";
import {BsDatepickerConfig, BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {ButtonsModule} from "ngx-bootstrap/buttons";
import {TimeagoModule} from "ngx-timeago";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    MemberDetailComponent,
    ListsComponent,
    MessagesComponent,
    NotFoundComponent,
    MemberCardComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    FormInputComponent,
    FormDateInputComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    TabsModule.forRoot(),
    NgxGalleryModule,
    NgxSpinnerModule,
    FileUploadModule,
    ReactiveFormsModule,
  ],
  exports: [
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
