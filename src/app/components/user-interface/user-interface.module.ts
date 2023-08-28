import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserInterfaceRoutingModule } from './user-interface-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChatInterfaceComponent } from './chat-interface/chat-interface.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SidebarComponent,
    ChatInterfaceComponent,
    MainPageComponent
  ],
  imports: [
    CommonModule,
    UserInterfaceRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserInterfaceModule { }
