import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-sidebar-content-add-contact',
  templateUrl: './sidebar-content-add-contact.component.html',
  styleUrls: ['./sidebar-content-add-contact.component.scss']
})
export class SidebarContentAddContactComponent implements OnInit {
  addNewContactForm: FormGroup;
  addNewContactMsg: string = '';
  user_id: string | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private fireStore: AngularFirestore,
    private firebaseService: FirebaseService
  ) {
    this.addNewContactForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  ngOnInit(): void {
    this.firebaseService.getUserId().then(user => {
      this.user_id = user.id;
    })
  }

  addNewContact() {
    if (this.addNewContactForm.valid) {
      this.firebaseService.verifyEmail(this.addNewContactForm.value.email)
        .then((res) => {
          if (res === true) {
            const obj = {
              email: this.addNewContactForm.value.email,
            }
            this.fireStore.collection('users').doc(this.user_id).collection('Contacts').doc(obj.email).set(obj)
            this.addNewContactForm.reset();
            this.addNewContactMsg = 'New Contact Added'
            setTimeout(() => {
              this.addNewContactMsg = ''
            }, 3000)
          }
          else {
            this.addNewContactMsg = 'Email Does Not Exist';
            this.addNewContactForm.reset();
            setTimeout(() => {
              this.addNewContactMsg = ''
            }, 3000)
          }
        })
    }
  }

  ngOnDestroy() {
    this.addNewContactForm.reset();
  }
}
