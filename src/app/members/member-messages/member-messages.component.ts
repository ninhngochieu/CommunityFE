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
  messages: Message[] = []
  @Input()
  username!: string;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

}
