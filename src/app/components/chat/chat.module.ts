import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';



@NgModule({
  declarations: [
    ChatListComponent,
    ChatWindowComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ChatModule { }
