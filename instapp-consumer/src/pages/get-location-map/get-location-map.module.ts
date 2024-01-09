import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GetLocationMapPage } from './get-location-map';

@NgModule({
  declarations: [
    GetLocationMapPage,
  ],
  imports: [
    IonicPageModule.forChild(GetLocationMapPage),
  ],
})
export class GetLocationMapPageModule {}
