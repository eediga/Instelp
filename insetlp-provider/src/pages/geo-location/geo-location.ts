import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { snapshotToArray } from './../../app/environment';
import { Geolocation } from '@ionic-native/geolocation';


/**
 * Generated class for the GeoLocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-geo-location',
  templateUrl: 'geo-location.html',
})
export class GeoLocationPage {

  data : string = '';
  items = [];
  ref = firebase.database().ref('items/');
  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation : Geolocation) {
    this.ref.on('value',resp =>{
      this.items = snapshotToArray(resp);
    });
    console.log(this.items);
  }
  addTocart(item)
  {
    console.log(item);
  }

  locate()
  {
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.data = "lati "+resp.coords.latitude + " longi "+resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
  }
}

