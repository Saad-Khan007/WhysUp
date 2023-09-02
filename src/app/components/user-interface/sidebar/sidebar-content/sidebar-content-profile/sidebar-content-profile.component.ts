import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-sidebar-content-profile',
  templateUrl: './sidebar-content-profile.component.html',
  styleUrls: ['./sidebar-content-profile.component.scss']
})
export class SidebarContentProfileComponent implements OnInit {
  src: string = 'assets/img/defaultProfile.jpg';
  user: any;
  user_id: string | undefined;
  editAboutProfile = true;
  editNameProfile = true;

  constructor(
    private fireStore: AngularFirestore,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit(): void {
    this.firebaseService.getUserId().then(res => {
      this.user = res;
      this.user_id = this.user.id;
      this.getImages();
    }).catch(err => {
      console.log(err);
    })
  }

  imgUpload() {
    const img = document.getElementById('profile-img') as HTMLInputElement;
    img.click();
  }

  getImages() {
    this.user_id && this.firebaseService.getImg(this.user_id).then(img => {
      this.src = img;
      this.firebaseService.imgSrc.next(this.src);
    })
  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    const filePath = `${this.user_id}/assets/img/profileImg`;
    this.firebaseService.uploadImg(filePath, file).then(res => {
      this.getImages();
    });
  }

  editProfileField(fieldName: string, fieldValue: string) {
    this.fireStore.collection('users').doc(this.user_id).update({ [fieldName]: fieldValue })
    this.editAboutProfile = true;
    this.editNameProfile = true;
  }
}
