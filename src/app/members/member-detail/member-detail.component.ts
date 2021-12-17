 import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
 import {MemberService} from "../../core/services/member.service";
 import {ActivatedRoute, Router} from "@angular/router";
 import {Member} from "../../core/model/Member";
 import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from "@kolkov/ngx-gallery";
 import {TabDirective, TabsetComponent} from "ngx-bootstrap/tabs";
 import {MessageService} from "../../core/services/message.service";
 import {Message} from "../../core/model/Message";
 import {ToastrService} from "ngx-toastr";
 import {PresenceService} from "../../core/services/presence.service";
 import {AccountService} from "../../core/services/account.service";
 import {User} from "../../core/model/User";

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit, OnDestroy {
  @ViewChild('memberTabs', {static: true})
  memberTabs!: TabsetComponent;

  public member!: Member;

  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];
  private activeTab!: TabDirective;
  messages: Message[]= [];
  private readonly user: User;

  constructor(private memberService: MemberService,
              private activatedRoute:ActivatedRoute,
              private messageService: MessageService,
              private toastService: ToastrService,
              private router: Router,
              public presenceService: PresenceService,
              private accountService: AccountService
              ) {
    this.user = accountService.hasLogin();
  }

  ngOnDestroy(): void {
      this.messageService.stopHubConnection();
    }

  ngOnInit(): void {
    // this.loadMember()
    this.activatedRoute.data.subscribe(res => {
      this.member =  res.member;
    })
    this.activatedRoute.queryParams.subscribe(p => {
      this.selectTab(p.tab);
    })
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

    this.galleryImages = this.getImages();

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

  selectTab(tabId: number){
    if (tabId){
      this.memberTabs.tabs[tabId].active = true;
    }
  }

  onTabActivated(data: TabDirective, tabNumber: number){
    this.changeRouteParams(tabNumber)
    this.activeTab = data;
    if (this.activeTab.heading=="Nhắn tin" && this.messages.length ===0){
      // this.loadMessages()
      this.messageService.createHubConnection(this.user, this.member.userName)
    }else {
      this.messageService.stopHubConnection();
    }
  }

  private changeRouteParams(tabNumber: number) {
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: {tab: tabNumber},
        queryParamsHandling: 'merge'
      }).then(r =>r);
  }

  likeMember(member: Member) {
    this.memberService.addLike(member.userName).subscribe(res => {
      this.toastService.success(res + " "+ member.knownAs)
    })
  }

}
