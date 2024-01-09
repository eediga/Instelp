import { MatCardModule } from '@angular/material';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { snapshotToArray } from './../../app/environment';


@IonicPage()
@Component({
  selector: 'page-display-category',
  templateUrl: 'display-category.html',
  
})

export class DisplayCategoryPage {
  category:string;
  items = [];
 // menu = [];
  ref;
  
  val1 : string;
  val2 : string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.category = this.navParams.get('category');    
    this.ref = firebase.database().ref(this.category+'/');
    console.log(this.category);
    this.ref.on('value',resp =>{

      this.items = snapshotToArray(resp);

      console.log("key"+this.items[0].key);
    // this.ref.child('/Menu/').on('value',resp =>{
    //   this.menu = snapshotToArray(resp);
    //   console.log(this.menu);
    // });
            
      //console.log(this.items);
    });


    
    // this.ref.child('/Menu/').on('value',resp =>{
    //   this.menu = snapshotToArray(resp);
    //   console.log(this.menu);
    // });
      // it should return the recipient and sender under the 'secondId'

  }
  addTocart(item)
  {
    console.log(item);
  }
  

}
