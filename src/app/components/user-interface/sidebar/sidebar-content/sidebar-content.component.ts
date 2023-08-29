import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-sidebar-content',
  templateUrl: './sidebar-content.component.html',
  styleUrls: ['./sidebar-content.component.scss']
})
export class SidebarContentComponent implements OnInit {
  @Input() sContent: string = ''
  @Output() imgContent = new EventEmitter<string>();

  sidebarContent = 'conversation'

  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.sidebarContent = this.sContent
    }
  }

  imgSrc(event: string) {
    this.imgContent.emit(event)
  }
}
