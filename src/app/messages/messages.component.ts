import { Component, OnInit } from '@angular/core';
import {MessageService} from "../core/services/message.service";
import {Message} from "../core/model/Message";
import {Pagination} from "../core/model/Pagination";
import {PageChangedEvent} from "ngx-bootstrap/pagination";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[] = []
  pagination!: Pagination;
  pageNumber = 1;
  pageSize = 5;
  container = "unread";
  loading = false;
  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadMessage();
  }

  loadMessage() {
    this.loading = true;
    this.messageService.getMessages(this.pageNumber, this.pageSize, this.container).subscribe(res => {
      this.pagination = res.pagination;
      this.messages = res.result;
      this.loading = false;
    })
  }

  pageChange($event: PageChangedEvent) {
    if (this.pageNumber!==$event.page){
      this.pageNumber = $event.page;
      this.loadMessage();
    }
  }
  deleteMessage(id: string){
    this.messageService.deleteMessage(id).subscribe(res=> {
      this.messages.splice(this.messages.findIndex(m=>m.id == id), 1)
    });
  }
}
