import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-sidebar-header',
  templateUrl: './sidebar-header.component.html',
  styleUrls: ['./sidebar-header.component.scss']
})
export class SidebarHeaderComponent implements OnInit {
  @Output() sContent = new EventEmitter<string>();
  @Input() imgUrl:string = '';

  sHeader = 'conversation';
  user: any;
  user_id: string | undefined;
  src: string = 'assets/img/defaultProfile.jpg'

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
            this.fireStorage.ref(this.user_id + '/ProfileImg').listAll().subscribe(res => {
              res?.items[0]?.getDownloadURL().then(downloadURL => {
                this.src = downloadURL;
              })
            });
            this.sContent.emit('conversation');
          } else {
            console.log('User document not found');
          }
        })
        .catch((error: any) => {
          console.error('Error getting document:', error);
        });
    })
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes){
      this.src = this.imgUrl
    }
  }

  toggleHeaders(header:string) {
    this.sHeader = header;
    this.sContent.emit(this.sHeader);
  }

  signOut() {
    this.fireAuth.signOut();
  }

}
