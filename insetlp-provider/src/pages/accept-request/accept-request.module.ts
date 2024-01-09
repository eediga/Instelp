import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AcceptRequestPage } from './accept-request';

@NgModule({
  declarations: [
    AcceptRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(AcceptRequestPage),
  ],
})
export class AcceptRequestPageModule {}
