import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'WhysUp';

  constructor(private firestore: AngularFirestore, private fireauth: AngularFireAuth ) {
    // .subscribe((users) =>{
    //   console.log(users.docs)
    // })
  }
  ngOnInit() {
    // this.getAllUsers()
  }

  // getAllUsers() {
  // this.firestore.collection('users').get().subscribe(users => {
  //   users.forEach(user => {
  //     console.log(user.id,user.data());

  //   })
  // })
  // this.firestore.collection('users').snapshotChanges().subscribe(data => {
  // console.log(data);
  // data.forEach(user => {
  // console.log(user.payload.doc.data());

  //   })

  // })
  // this.firestore.collection('users').doc('user#1').set({name: 'Ali'})
  // this.fireauth.createUserWithEmailAndPassword('saad1@example.com','saad@123').then((user) => {
  //   console.log(user.user?.sendEmailVerification());
  // }).catch((err) => {
  //   console.log(err.message);
  // })
  // }
}
