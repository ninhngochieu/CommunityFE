import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {ToastrService} from "ngx-toastr";
import {User} from "../model/User";
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  hubUrl = environment.hubUrl;
  private hubConnection!: HubConnection;
  private onlineUserSource = new BehaviorSubject<string[]>([]);
  onlineUser$ = this.onlineUserSource.asObservable();

  constructor(private toastService: ToastrService) { }

  createHubConnection(user: User){
    if (user){
      this.hubConnection = new HubConnectionBuilder()
        .withUrl(this.hubUrl + 'presence', {
          accessTokenFactory(): string | Promise<string> {
            return  user.token
          }
        })
        .withAutomaticReconnect()
        .build()

      this.hubConnection
        .start()
        .catch(err => console.log(err))

      this.hubConnection.on("UserIsOnline", username => {
        this.toastService.info(username + ' đã kết nối')
      })

      this.hubConnection.on("UserIsOffline", username => {
        this.toastService.warning(username + ' đã thoát')
      })

      this.hubConnection.on("GetOnlineUsers", (username: []) => {
        console.log(username)
        this.onlineUserSource.next(username);
      })
    }
  }

  stopConnection(){
    this.hubConnection
      .stop()
      .catch(err => console.log(err))
  }
}
