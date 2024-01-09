import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DisplayCategoryPage } from './display-category';

@NgModule({
  declarations: [
    DisplayCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(DisplayCategoryPage),
  ],
})
export class DisplayCategoryPageModule {}
