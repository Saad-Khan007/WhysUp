import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sidebar-content-add-contact',
  templateUrl: './sidebar-content-add-contact.component.html',
  styleUrls: ['./sidebar-content-add-contact.component.scss']
})
export class SidebarContentAddContactComponent implements OnInit {
  addNewContactForm: FormGroup;
  addNewContactMsg: string = '';
  user: any;
  user_id: string | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private fireStore: AngularFirestore,
    private fireAuth: AngularFireAuth
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
          } else {
            console.log('User document not found');
          }
        })
        .catch((error: any) => {
          console.error('Error getting document:', error);
        });
    })
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
      }, 3000)
    }
  }
}
