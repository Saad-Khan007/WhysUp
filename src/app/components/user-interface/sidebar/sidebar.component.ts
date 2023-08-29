import { Component, OnInit, SimpleChanges } from '@angular/core';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  sContent: string = '';
  imgUrl: string = ''

  constructor() { }

  ngOnInit(): void { }

  sContentFunc(event: string): void{
    this.sContent = event;
  }

  imgContent(event: string): void{
    this.imgUrl = event;
  }
}
