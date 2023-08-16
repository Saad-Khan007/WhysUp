import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  sideBar_profile = false;
  sideBar_conversation = true;
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

  ngOnInit(): void {
  }

  showProfile() {
    this.sideBar_conversation = false
    this.sideBar_profile = true;
  }
  showConverstion() {
    this.sideBar_profile = false;
    this.sideBar_conversation = true
  }
}
