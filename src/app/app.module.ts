import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDuOH0ABjvQuQ9uUVPEy1scFDeylSqAB6I",
  authDomain: "angularchatapp-b0726.firebaseapp.com",
  projectId: "angularchatapp-b0726",
  storageBucket: "angularchatapp-b0726.appspot.com",
  messagingSenderId: "34268434083",
  appId: "1:34268434083:web:33b21668853571e5937916"
};
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
