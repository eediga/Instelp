import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Menu, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import { snapshotToArray } from './../../app/environment';
import { DisplayDetailedDataPage } from '../display-detailed-data/display-detailed-data';
import { compareDates } from 'ionic-angular/umd/util/datetime-util';
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  category:string;
  items = [];
  menu = [];
  ref;
  rating: number = 4.2;
  
  val1 : string;
  val2 : string;

  constructor(public navCtrl: NavController,public loadctrl:LoadingController,public navParams: NavParams,public events: Events,
    ) {

  }
  
  ionViewDidLoad(){
    let ctrl = this.loadctrl.create({
      content : "Loading.."
    });
    ctrl.present();
    this.category = this.navParams.get('category'); 
       
    this.ref = firebase.database().ref(this.category+'/');
    // this.ref = firebase.database().ref(this.category+'/');
    console.log(this.category);
    this.ref.on('value',resp =>{

      this.items = snapshotToArray(resp);  
      console.log(this.items);
      ctrl.dismiss();
    }
   );
   this.events.subscribe('star-rating:changed', (starRating) => {
    console.log(starRating);
    this.rating = starRating;
  });
  }
  displayMenu(itemName)
  {
    console.log(itemName.value.name);
    this.navCtrl.push(DisplayDetailedDataPage,{
      itemName:itemName.value.name,
      itemPlace: itemName,
      itemCategory : this.category
    });
  }

}
