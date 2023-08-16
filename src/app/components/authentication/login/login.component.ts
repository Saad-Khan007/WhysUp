import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  error: undefined | string;
  msg: undefined | string;
  constructor(formBuilder: FormBuilder, private router: Router) {
    this.form = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,,Validators.pattern(/.{8,}/)]]
    })
  }

  ngOnInit(): void {
  }

  submit(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.form.value.email, this.form.value.password)
        .then((userCredential) => {
          const user = userCredential.user;
          this.msg = 'Logged in successfully.';
          setTimeout(() => {
            this.msg = undefined;
            this.form.reset();
            this.router.navigate(['/authentication/register'])
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
    const auth = getAuth();
    sendPasswordResetEmail(auth, this.form.value.email)
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
