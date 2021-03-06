import {Injectable} from '@angular/core';
import {HttpClientService, Type} from "./http-client.service";
import {HttpParams} from "@angular/common/http";
import {PaginationResult} from "../model/Pagination";
import {map, take} from "rxjs/operators";
import {Message} from "../model/Message";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {User} from "../model/User";
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  hubUrl = environment.hubUrl;

  private hubConnection!: HubConnection;
  private messageThreadSource = new BehaviorSubject<Message[]>([])
  messageThread$ = this.messageThreadSource.asObservable();

  constructor(private httpClientService: HttpClientService) { }

  createHubConnection(user: User, otherUsername: string){
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'message?user='+otherUsername, {
        accessTokenFactory(): string | Promise<string> {
          return user.token
        }
      })
      .withAutomaticReconnect()
      .build()

    this.hubConnection.start().catch(err => console.log(err))

    this.hubConnection.on("ReceiveMessageThread", (messages: []) => {
      this.messageThreadSource.next(messages)
    })

    this.hubConnection.on("NewMessage", message => {
      this.messageThread$.pipe(take(1)).subscribe(messages => {
        this.messageThreadSource.next([...messages, message]); // Nếu có 1 message mới, nó sẽ được gắn vô sau
      });
    });
  }

  stopHubConnection(){
    if(this.hubConnection){
      this.hubConnection.stop().then(r => r);
    }
  }

  getMessages(pageNumber: number, pageSize: number, container: string): Observable<PaginationResult<Message[]>>{
    let options;
    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber);
    params = params.append('pageSize', pageSize);
    params = params.append('container', container)

    options  = {
      observe: 'response',
      params
    };

    return this.httpClientService.request<PaginationResult<Message>[]>(Type.get, 'message',{},options).pipe(map(response=>{
      return response;
    }));
  }
  getMessageThread(username: string): Observable<Message[]>{
    return this.httpClientService.request(Type.get, 'message/thread/'+username)
  }

  async sendMessage(recipientUsername: string, content: string): Promise<any>{
    // return this.httpClientService.request(Type.post, 'message', {recipientUsername, content});\
    return this.hubConnection.invoke('SendMessage', {recipientUsername, content}).catch(err => console.log(err));
  }
  deleteMessage(id: string): Observable<string>{
    return this.httpClientService.request(Type.delete, 'message/'+id);
  }
}
