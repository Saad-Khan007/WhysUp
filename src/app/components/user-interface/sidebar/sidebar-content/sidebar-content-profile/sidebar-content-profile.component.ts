import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-sidebar-content-profile',
  templateUrl: './sidebar-content-profile.component.html',
  styleUrls: ['./sidebar-content-profile.component.scss']
})
export class SidebarContentProfileComponent implements OnInit {
  @Output() imgSrc = new EventEmitter<string>();

  src: string = 'assets/img/defaultProfile.jpg';
  user: any;
  user_id: string | undefined;
  editAboutProfile = true;
  editNameProfile = true;

  constructor(
    private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private fireStorage: AngularFireStorage,
  ) { }

  ngOnInit(): void {
    this.fireAuth.onAuthStateChanged((user) => {
      this.fireStore.doc('users/' + user?.uid).get().toPromise()
        .then((docSnapshot: any) => {
          if (docSnapshot.exists) {
            this.user = docSnapshot.data();
            this.user_id = user?.uid
            this.getImages();
          } else {
            console.log('User document not found');
          }
        })
        .catch((error: any) => {
          console.error('Error getting document:', error);
        });
    })
  }

  imgUpload() {
    const img = document.getElementById('profile-img') as HTMLInputElement;
    img.click();
  }

  deleteAllImages() {
    const imagesRef = this.fireStorage.ref(this.user_id + '/ProfileImg');
    imagesRef?.listAll().forEach((res) => {
      res?.items[0]?.delete()
    });
  }

  getImages() {
    const imagesRef = this.fireStorage.ref(this.user_id + '/ProfileImg');
    imagesRef?.listAll().forEach((res) => {
      res?.items[0]?.getDownloadURL().then((r) => {
        this.src = `${r}`;
        this.imgSrc.emit(this.src);
      })
    });
  }

  uploadFile(event: any) {
    this.deleteAllImages()
    const file = event.target.files[0];
    const filePath = `${this.user_id}/ProfileImg/` + file.name;
    this.fireStorage.upload(filePath, file).then(res => {
      this.getImages()
    });
  }

  editProfileField(fieldName: string, fieldValue: string) {
    this.fireStore.collection('users').doc(this.user_id).update({ [fieldName]: fieldValue })
    this.editAboutProfile = true;
    this.editNameProfile = true;
  }
}
