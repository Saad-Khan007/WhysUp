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

  constructor(private firestore: AngularFirestore, private fireauth: AngularFireAuth) {
  }
  ngOnInit() {
    // this.firestore.collection('users').snapshotChanges().subscribe(data => {
    //   data.forEach(user => {
    //     console.log(user.payload.doc.data());
        
    //   })
    // })
    // this.firestore.collection('users').doc('user#1').set({name: 'Assad1'})
    // const userData = {
    //   name: 'Alice Smith',
    //   email: 'alice@example.com',
    //   age: 28,
    // };

    // this.firestore.collection('users').doc('UserEmail').set(userData)
    // .then(() => {
    //   console.log('Document added with custom ID:', 'UserEmail');
    // })
    // .catch(error => {
    //   console.error('Error adding document:', error);
    // });
  }

  // getAllUsers() {
  // this.firestore.collection('users').get().subscribe(users => {
  //   users.forEach(user => {
  //     console.log(user.id,user.data());

  //   })
  // })

  // })
}
