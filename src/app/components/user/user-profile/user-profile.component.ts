import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  sideBar_profile = true;
  sideBar_conversation = false;
  user: any
  src: string = 'assets/img/defaultProfile.jpg'
  conversations = [
    {
      title: 'Andrew',
      time: '8:12',
      msg: 'You are now offline'
    },
    {
      title: 'Tom',
      time: '21:00',
      msg: 'How are you?'
    },
    {
      title: 'Jerry',
      time: '00:00',
      msg: '??'
    },
    {
      title: 'Hello world',
      time: '15:13',
      msg: 'Compiling...'
    },
  ]
  constructor(private fireAuth: AngularFireAuth, private fireStore: AngularFirestore, private fireStorage: AngularFireStorage) { }

  ngOnInit(): void {
    this.fireAuth.onAuthStateChanged((user) => {
      this.fireStore.doc('users/' + user?.uid).get().toPromise()
        .then((docSnapshot: any) => {
          if (docSnapshot.exists) {
            this.user = docSnapshot.data();
            this.getImages();
              // this.src = `${src}`;
              // console.log(src);
              
          } else {
            console.log('Document not found');
          }
        })
        .catch((error: any) => {
          console.error('Error getting document:', error);
        });
    })
  }

  showProfile() {
    this.sideBar_conversation = false
    this.sideBar_profile = true;
  }

  imgUpload() {
    const img = document.getElementById('profile-img') as HTMLInputElement;
    img.click();
  }

  deleteAllImages() {
    const imagesRef = this.fireStorage.ref(this.user.name + '/ProfileImg'); // Reference to the "uploads" folder
    imagesRef.listAll().forEach((res) => {
      console.log(res.items[0])
      res.items[0].delete()
    });
  }

  getImages() {
    const imagesRef = this.fireStorage.ref(this.user.name + '/ProfileImg'); // Reference to the "uploads" folder
    imagesRef.listAll().forEach((res) => {
      res.items[0].getDownloadURL().then((r) => {
        this.src = `${r}`;
        console.log(this.src);
        
      })
    });
  }

  uploadFile(event: any) {
    this.deleteAllImages()
    const file = event.target.files[0];
    const filePath = `${this.user.name}/ProfileImg/` + file.name;
    this.fireStorage.upload(filePath, file);
  }

  signOut() {
    this.fireAuth.signOut();
  }

  showConverstion() {
    this.sideBar_profile = false;
    this.sideBar_conversation = true
  }
}
