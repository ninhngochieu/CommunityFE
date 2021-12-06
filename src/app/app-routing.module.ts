import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AppComponent} from "./app.component";
import {HomeComponent} from "./home/home.component";
import {MemberListComponent} from "./members/member-list/member-list.component";
import {MemberDetailComponent} from "./members/member-detail/member-detail.component";
import {ListsComponent} from "./lists/lists.component";
import {MessagesComponent} from "./messages/messages.component";
import {AuthGuard} from "./core/guards/auth.guard";
import {NotFoundComponent} from "./not-found/not-found.component";


let routers: Routes = [
  {path: "", component: HomeComponent, pathMatch: "full"},
  {path:"", runGuardsAndResolvers: 'always', canActivate: [AuthGuard], children: [
      {path: "members", component: MemberListComponent},
      {path: "members/:id", component: MemberDetailComponent},
      {path: "lists", component: ListsComponent},
      {path: "messages", component: MessagesComponent},
    ]
  },
  {path: "**", component: NotFoundComponent},

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routers)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
