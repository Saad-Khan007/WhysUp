import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-sidebar-content',
  templateUrl: './sidebar-content.component.html',
  styleUrls: ['./sidebar-content.component.scss']
})
export class SidebarContentComponent implements OnInit {
  sidebarContent = 'status'

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.firebaseService.sideBarContent.subscribe(sidebarContent => {
      this.sidebarContent = sidebarContent
    })
  }

}
