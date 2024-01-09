import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddDataFirebasePage } from './add-data-firebase';

@NgModule({
  declarations: [
    AddDataFirebasePage,
  ],
  imports: [
    IonicPageModule.forChild(AddDataFirebasePage),
  ],
})
export class AddDataFirebasePageModule {}
