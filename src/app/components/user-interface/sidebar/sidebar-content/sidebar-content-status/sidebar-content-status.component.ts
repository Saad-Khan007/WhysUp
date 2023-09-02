import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/interfaces/interface';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-sidebar-content-status',
  templateUrl: './sidebar-content-status.component.html',
  styleUrls: ['./sidebar-content-status.component.scss']
})
export class SidebarContentStatusComponent implements OnInit {
  imgSrc: string = 'assets/img/defaultProfile.jpg'
  user: any;
  user_id: string | undefined;
  statusBadge: boolean = false;
  status: string[] = []
  constructor(
    private firebaseService: FirebaseService,
  ) { }

  ngOnInit(): void {
    this.firebaseService.getUserId().then(res => {
      this.user = res;
      this.user_id = this.user.id;
      this.imgSrc = res.src;
      this.firebaseService.deleteExpiredFiles(res.id)
      this.getStatus(res.id);
    }).catch(err => {
      console.log(err);
    })
  }

  statusInputClick() {
    const img = document.getElementById('status-upload-input') as HTMLInputElement;
    img.click();
  }

  statusUpload(event: any) {
    const files: File[] = Array.from(event.target.files);

    files.forEach((file) => {
      const filePath = `${this.user_id}/assets/status/${file.name}`;
      const data: Status = {
        customMetadata: {
          uploadedTime: new Date().toLocaleString(),
          expiresTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleString()
        }
      };
      this.firebaseService.uploadStatus(filePath, file, data)
    });
  }

  getStatus(id: string) {
    const res = this.firebaseService.getStatus(id)
    res.then((status) => {
      this.status = status
      console.log(this.status);
    })
  }
}
