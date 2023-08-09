import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
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
      createUserWithEmailAndPassword(auth, this.form.value.email, this.form.value.password)
        .then((userCredential) => {
          const user = userCredential.user;
          this.msg = 'User created successfully.';
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
          }, 5000)
        });
    }
  }


}
