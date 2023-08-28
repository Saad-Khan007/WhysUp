import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  sideBar_profile = false;
  sideBar_conversation = true;
  sideBar_newContact = false;
  editAboutProfile = true
  editNameProfile = true
  profileImgReload = true
  user: any;
  user_id: string | undefined;
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
  addNewContactForm: FormGroup;
  addNewContactMsg: string = '';
  constructor(
    private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private fireStorage: AngularFireStorage,
    private formBuilder: FormBuilder
  ) {
    this.addNewContactForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    })
  }

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

  showProfile() {
    this.sideBar_conversation = false
    this.sideBar_profile = true;
  }

  imgUpload() {
    const img = document.getElementById('profile-img') as HTMLInputElement;
    img.click();
  }

  deleteAllImages() {
    const imagesRef = this.fireStorage.ref(this.user_id + '/ProfileImg'); // Reference to the "uploads" folder
    imagesRef?.listAll().forEach((res) => {
      res?.items[0]?.delete()
    });
  }

  getImages() {
    const imagesRef = this.fireStorage.ref(this.user_id + '/ProfileImg'); // Reference to the "uploads" folder
    imagesRef?.listAll().forEach((res) => {
      res?.items[0]?.getDownloadURL().then((r) => {
        this.src = `${r}`;
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

  signOut() {
    this.fireAuth.signOut();
  }

  editProfileField(fieldName: string, fieldValue: string) {
    this.fireStore.collection('users').doc(this.user_id).update({ [fieldName]: fieldValue })
    this.editAboutProfile = true;
    this.editNameProfile = true;
  }

  addNewContact() {
    if (this.addNewContactForm.valid) {
      const obj = {
        email: this.addNewContactForm.value.email,
        name: this.addNewContactForm.value.name
      }
      this.fireStore.collection('users').doc(this.user_id).collection('Contacts').doc(obj.email).set(obj)
      this.addNewContactForm.reset();
      this.addNewContactMsg = 'New Contact Added'
      setTimeout(() => {
        this.addNewContactMsg = ''
        this.sideBar_newContact = false;
        this.sideBar_conversation = true
      }, 3000)
    }
  }

}
