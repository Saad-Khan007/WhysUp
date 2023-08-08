import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateGroupComponent } from './create-group/create-group.component';
import { GroupChatComponent } from './group-chat/group-chat.component';
import { AddParticipantsComponent } from './add-participants/add-participants.component';

@NgModule({
  declarations: [
    CreateGroupComponent,
    GroupChatComponent,
    AddParticipantsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GroupChatModule { }
