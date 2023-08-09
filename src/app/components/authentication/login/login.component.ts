import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

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
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$')]],
      password: ['', [Validators.required]]
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
          console.log(error.message);
        });
    }
  }

}
