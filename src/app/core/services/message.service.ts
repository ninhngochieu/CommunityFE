import {Injectable} from '@angular/core';
import {HttpClientService, Type} from "./http-client.service";
import {HttpParams} from "@angular/common/http";
import {PaginationResult} from "../model/Pagination";
import {map} from "rxjs/operators";
import {Message} from "../model/Message";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private httpClientService: HttpClientService) { }

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

  sendMessage(recipientUsername: string, content: string): Observable<Message>{
    return this.httpClientService.request(Type.post, 'message', {recipientUsername, content});
  }
  deleteMessage(id: string): Observable<string>{
    return this.httpClientService.request(Type.delete, 'message/'+id);
  }
}
