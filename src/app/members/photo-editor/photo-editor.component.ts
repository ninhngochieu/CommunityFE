import {Component, Input, OnInit} from '@angular/core';
import {Member, Photo} from "../../core/model/Member";
import {FileUploader} from "ng2-file-upload";
import {environment} from "../../../environments/environment";
import {AccountService} from "../../core/services/account.service";
import {User} from "../../core/model/User";
import {MemberService} from "../../core/services/member.service";

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  uploader!: FileUploader;
  hasBaseDropZone = false;
  baseUrl = environment.baseUrl;
  user: User;

  @Input()
  member!: Member;

  constructor(private accountService: AccountService, private memberService: MemberService) {
    this.user = this.accountService.hasLogin();
  }

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e: any){
    this.hasBaseDropZone = e;
  }

  private initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl +"user/add-photos",
      authToken: 'Bearer '+ this.user.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10*1024*1024
    })
    this.uploader.onAfterAddingFile = (file) =>{
      file.withCredentials = false;
    }
    this.uploader.onSuccessItem = (item, res, status, headers) => {
      if (res){
        const photo = JSON.parse(res);
        this.member.photos.push(photo)
      }
    }
  }
  setMainPhoto(photo: Photo){
    this.memberService.setMainPhoto(photo.id).subscribe(() => {
      this.user.photoUrl = photo.url;
      this.member.photoUrl = photo.url;
      console.log(this.user)
      this.accountService.logout();
      this.accountService.createSessionUser(this.user);
      this.member.photos.forEach(p => {
        if(p.isMain) p.isMain = false;
        if(p.id == photo.id) p.isMain = true;
      })
    });
  }

}
