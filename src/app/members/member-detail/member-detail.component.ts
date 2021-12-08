 import { Component, OnInit } from '@angular/core';
 import {MemberService} from "../../core/services/member.service";
 import {ActivatedRoute} from "@angular/router";
 import {Member} from "../../core/model/Member";
 import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from "@kolkov/ngx-gallery";

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  public member!: Member;
  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];
  constructor(private memberService: MemberService,private activatedRoute:ActivatedRoute) { }

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
}
