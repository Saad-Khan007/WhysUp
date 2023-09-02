import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserInterfaceRoutingModule } from './user-interface-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChatInterfaceComponent } from './chat-interface/chat-interface.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarHeaderComponent } from './sidebar/sidebar-header/sidebar-header.component';
import { SidebarContentComponent } from './sidebar/sidebar-content/sidebar-content.component';
import { SidebarContentProfileComponent } from './sidebar/sidebar-content/sidebar-content-profile/sidebar-content-profile.component';
import { SidebarContentAddContactComponent } from './sidebar/sidebar-content/sidebar-content-add-contact/sidebar-content-add-contact.component';
import { SidebarContentConversationComponent } from './sidebar/sidebar-content/sidebar-content-conversation/sidebar-content-conversation.component';
import { SidebarContentStatusComponent } from './sidebar/sidebar-content/sidebar-content-status/sidebar-content-status.component';


@NgModule({
  declarations: [
    SidebarComponent,
    ChatInterfaceComponent,
    MainPageComponent,
    SidebarHeaderComponent,
    SidebarContentComponent,
    SidebarContentProfileComponent,
    SidebarContentAddContactComponent,
    SidebarContentConversationComponent,
    SidebarContentStatusComponent
  ],
  imports: [
    CommonModule,
    UserInterfaceRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserInterfaceModule { }
