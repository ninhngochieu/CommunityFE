 import {Component, OnInit, ViewChild} from '@angular/core';
 import {MemberService} from "../../core/services/member.service";
 import {ActivatedRoute} from "@angular/router";
 import {Member} from "../../core/model/Member";
 import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from "@kolkov/ngx-gallery";
 import {TabDirective, TabsetComponent} from "ngx-bootstrap/tabs";
 import {MessageService} from "../../core/services/message.service";
 import {Message} from "../../core/model/Message";

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('memberTabs')
  memberTabs!: TabsetComponent;

  public member!: Member;

  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];
  private activeTab!: TabDirective;
  messages: Message[]= [];

  constructor(private memberService: MemberService,private activatedRoute:ActivatedRoute, private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadMember()
    this.galleryOptions = [
      {
        width:'500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ]
  }

  loadMember(){
    this.memberService.getMember(this.activatedRoute.snapshot.paramMap.get("username")).subscribe(m => {
      this.member = m;
      this.galleryImages = this.getImages();
    });

  }

  private getImages(): NgxGalleryImage[] {
    const imageUrls:NgxGalleryImage[] = []
    this.member.photos.forEach(image => {
      imageUrls.push({
        small: image?.url,
        medium: image?.url,
        big: image?.url
      })
    })
    return imageUrls;
  }

  private loadMessages() {
    this.messageService.getMessageThread(this.member.userName).subscribe(res=> {
      this.messages = res;
      console.log(res)
    })
  }

  onTabActivated(data: TabDirective){
    this.activeTab = data;
    if (this.activeTab.heading=="Nhắn tin" && this.messages.length ===0){
      this.loadMessages()
    }
  }
}
