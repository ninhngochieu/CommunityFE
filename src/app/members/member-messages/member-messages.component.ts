import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Message} from "../../core/model/Message";
import {MessageService} from "../../core/services/message.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {

  @ViewChild('messageForm')
  messageForm!: NgForm;
  @Input()
  messages: Message[] = []
  @Input()
  username!: string;
  messageContent!: string;

  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
    this.messageService.messageThread$.subscribe(messages => {
      this.messages = messages;
    })
  }
  sendMessage(){
    // this.messageService.sendMessage(this.username, this.messageContent).subscribe(res=> {
    //   this.messages.push(res)
    //   this.messageForm.reset()
    // })
    this.messageService.sendMessage(this.username, this.messageContent).then(() => {
      this.messageForm.reset()
    })
  }

}
