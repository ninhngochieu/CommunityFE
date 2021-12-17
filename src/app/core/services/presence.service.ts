import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {ToastrService} from "ngx-toastr";
import {User} from "../model/User";
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {BehaviorSubject} from "rxjs";
import { take } from 'rxjs/operators';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  hubUrl = environment.hubUrl;
  private hubConnection!: HubConnection;
  private onlineUserSource = new BehaviorSubject<string[]>([]);
  onlineUser$ = this.onlineUserSource.asObservable();

  constructor(private toastService: ToastrService, private router: Router) { }

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
        // this.toastService.info(username + ' đã kết nối')
        this.onlineUser$.pipe(take(1)).subscribe(usernames => {
          this.onlineUserSource.next([...usernames, username])
        })
      })

      this.hubConnection.on("UserIsOffline", username => {
        // this.toastService.warning(username + ' đã thoát')
        this.onlineUser$.pipe(take(1)).subscribe(usernames => {
          this.onlineUserSource.next([...usernames.filter(x=>x!==username)])
        })
      })

      this.hubConnection.on("GetOnlineUsers", (username: []) => {
        console.log(username)
        this.onlineUserSource.next(username);
      })

      this.hubConnection.on("NewMessageReceived", ({username, knownAs}) => {
        this.toastService.info(knownAs + " đã gửi 1 tin nhắn mới cho bạn")
          .onTap
          .pipe(take(1))
          .subscribe(() => {
            this.router.navigateByUrl('/members/'+ username + '?tab=3').then()
          });
      })
    }
  }

  stopConnection(){
    this.hubConnection
      .stop()
      .catch(err => console.log(err))
  }
}
