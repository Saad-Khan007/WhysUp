import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusListComponent } from './status-list/status-list.component';
import { StatusViewComponent } from './status-view/status-view.component';
import { AddStatusComponent } from './add-status/add-status.component';



@NgModule({
  declarations: [
    StatusListComponent,
    StatusViewComponent,
    AddStatusComponent
  ],
  imports: [
    CommonModule
  ]
})
export class StatusModule { }
