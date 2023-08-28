import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  error: undefined | string;
  msg: undefined | string;
  constructor(formBuilder: FormBuilder, private router: Router, private fireAuth: AngularFireAuth, private fireStore: AngularFirestore) {
    this.form = formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/.{8,}/)]]
    })
  }
  ngOnInit(): void {
  }
  submit(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.fireAuth.createUserWithEmailAndPassword(this.form.value.email, this.form.value.password)
        .then((userCredential) => {
          const user = {
            name: this.form.value.name,
            email: this.form.value.email,
            about: 'Hello, I am using WhysUp App'
          };
          this.msg = 'User created successfully.';
          this.fireStore.collection('users').doc(userCredential?.user?.uid).set(user)
            .then(() => {
            })
            .catch(error => {
              this.error = error.message;
            });
          setTimeout(() => {
            this.msg = undefined;
            this.error = undefined;
            this.form.reset();
            this.router.navigate(['/authentication/login'])
          }, 3000)
        })
        .catch((error) => {
          this.error = error.message;
          setTimeout(() => {
            this.error = undefined;
          }, 3000)
        });
    }
  }

  forgetPassword() {
    this.fireAuth.sendPasswordResetEmail(this.form.value.email)
      .then(() => {
        this.msg = 'Password reset email sent!';
        setTimeout(() => {
          this.msg = undefined;
          this.form.reset();
          this.router.navigate(['/authentication/login'])
        }, 3000)
      })
      .catch((error) => {
        this.error = error.message;
        setTimeout(() => {
          this.error = undefined;
        }, 3000)
      });
  }

}
