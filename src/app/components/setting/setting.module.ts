import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingComponent } from './setting/setting.component';
import { PrivacySettingComponent } from './privacy-setting/privacy-setting.component';
import { AppearanceSettingComponent } from './appearance-setting/appearance-setting.component';



@NgModule({
  declarations: [
    SettingComponent,
    PrivacySettingComponent,
    AppearanceSettingComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SettingModule { }
