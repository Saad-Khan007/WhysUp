import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-sidebar-header',
  templateUrl: './sidebar-header.component.html',
  styleUrls: ['./sidebar-header.component.scss']
})
export class SidebarHeaderComponent implements OnInit {
  sHeader = 'status';
  src: string = ''

  constructor(private firebaseService: FirebaseService) {
    firebaseService.imgSrc.subscribe(imgUrl => {
      this.src = imgUrl;
    })
  }

  ngOnInit(): void {
    this.src = 'assets/img/defaultProfile.jpg';
  }

  toggleHeaders(header: string) {
    this.sHeader = header;
    this.firebaseService.sideBarContent.next(this.sHeader)
  }

  signOut() {
    this.firebaseService.signOut();
  }
}
