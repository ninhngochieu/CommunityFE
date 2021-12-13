import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../../core/model/Message";
import {MessageService} from "../../core/services/message.service";

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {

  @Input()
  username!: string;
  public messages: Message[] = []

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadMessages()
  }

  private loadMessages() {
    this.messageService.getMessageThread(this.username).subscribe(res=> {
      this.messages = res;
    })
  }
}
