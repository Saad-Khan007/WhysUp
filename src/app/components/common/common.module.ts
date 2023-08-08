import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { ToastComponent } from './toast/toast.component';



@NgModule({
  declarations: [
    ModalComponent,
    ToastComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CommonModule { }
