import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-content-conversation',
  templateUrl: './sidebar-content-conversation.component.html',
  styleUrls: ['./sidebar-content-conversation.component.scss']
})
export class SidebarContentConversationComponent implements OnInit {
  conversations = [
    {
      title: 'Andrew',
      time: '8:12',
      msg: 'You are now offline'
    },
    {
      title: 'Tom',
      time: '21:00',
      msg: 'How are you?'
    },
    {
      title: 'Jerry',
      time: '00:00',
      msg: '??'
    },
    {
      title: 'Hello world',
      time: '15:13',
      msg: 'Compiling...'
    },
  ]
  constructor() { }

  ngOnInit(): void { }

}
