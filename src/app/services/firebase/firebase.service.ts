import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Subject } from 'rxjs';
import { Status } from 'src/app/interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  imgSrc = new Subject<string>()
  sideBarContent = new Subject<string>()

  constructor(
    private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private fireStorage: AngularFireStorage,
  ) {

  }

  getUserId(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.fireAuth.onAuthStateChanged((user) => {
        if (user) {
          this.fireStore.doc('users/' + user.uid).get().toPromise()
            .then((docSnapshot: any) => {
              if (docSnapshot.exists) {
                const userData = docSnapshot.data();
                this.fireStorage.ref(user.uid + '/assets/img/profileImg').getDownloadURL().toPromise()
                  .then(url => {
                    userData.id = user.uid;
                    if (url) {
                      userData.src = url;
                      resolve(userData)
                    } else {
                      userData.src = 'assets/img/defaultProfile.jpg';
                      resolve(userData)
                    }
                  })
                  .catch(err => reject(err));
              } else {
                console.log('User document not found');
                reject('User document not found');
              }
            })
            .catch((error: any) => {
              console.error('Error getting document:', error);
              reject(error);
            });
        } else {
          console.log('User not authenticated');
          reject('User not authenticated');
        }
      });
    });
  }

  signOut() {
    this.fireAuth.signOut();
  }

  uploadImg(filePath: string, file: File) {
    return new Promise<void>((resolve, reject) => {
      this.fireStorage.upload(filePath, file)
        .then(() => resolve()).catch(err => reject(err));
    })
  }

  uploadStatus(filePath: string, file: File, metadata: Status) {
    return new Promise<void>((resolve, reject) => {
      this.fireStorage.upload(filePath, file, metadata)
        .then(() => resolve()).catch(err => reject(err));
    })
  }

  getStatus(user_id: string) {
    return new Promise<string[]>((resolve, reject) => {
      let status: string[] = [];
      this.fireStorage.ref(user_id + '/assets/status/').listAll().forEach(res => {
        res.items.forEach(item => {
          item.getDownloadURL().then((downloadURL) => {
            status.push(downloadURL)
          });
        });
      }).then(() => {
        resolve(status);
      }).catch((err) => {
        reject(err);
      })
    })
  }

  getImg(user_id: string) {
    return new Promise<any>((resolve, reject) => {
      this.fireStorage.ref(user_id + '/assets/img/profileImg').getDownloadURL().toPromise()
        .then(url => resolve(url)).catch(err => reject(err));
    })
  }

  async verifyEmail(email: string): Promise<boolean> {
    try {
      const methods = await this.fireAuth.fetchSignInMethodsForEmail(email);
      console.log(methods);
      if (methods.length > 0) {
        this.fireStore.collection('users', ref => ref.where('email', '==', email)).get().subscribe(users => {
          // console.log(users.forEach(user => console.log(user.id)));
        })
      }
      return methods.length > 0;
    } catch (error) {
      return false;
    }
  }

  deleteExpiredFiles(id: number): void {
    const bucket = this.fireStorage.storage.ref(`${id}/assets/status`);
    bucket.listAll().then(res => {
      res.items.forEach(item => {
        item.getMetadata().then(metadata => {
          const currentTime = Date.now();
          const expiresTime = metadata.customMetadata?.['expiresTime'];
          if (expiresTime && new Date(expiresTime).getTime() < currentTime) {
            item.delete()
              .catch((error) => {
                console.error(`Error deleting expired file: ${item.fullPath}`, error);
              });
          }
        })
      })
    })
  }
}
