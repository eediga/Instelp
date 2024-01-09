import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DriverRegisterPage } from './driver-register';

@NgModule({
  declarations: [
    DriverRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(DriverRegisterPage),
  ],
})
export class DriverRegisterPageModule {}
