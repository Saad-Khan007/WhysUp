import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallListComponent } from './call-list/call-list.component';
import { CallViewComponent } from './call-view/call-view.component';



@NgModule({
  declarations: [
    CallListComponent,
    CallViewComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CallModule { }
