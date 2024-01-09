import { Geolocation } from '@ionic-native/geolocation';
import { AddDataFirebasePage } from './../add-data-firebase/add-data-firebase';

import { markDirty } from '@angular/core/src/render3';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import * as firebase from 'firebase';


declare var google: any;

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markers = [];
  ref = firebase.database().ref('geolocations/');
  latitude;
  longitude;
  constructor(public navCtrl: NavController,public platform: Platform,private geolocation : Geolocation) {

  }
  //--------------watch poition------------------------------------

//------------------------------------------------

  addData()
  {
    this.navCtrl.push(AddDataFirebasePage);
  }

//-----------Geolocation live tracking----------I methode---------------------
//   Geolocation()
//   {
//     var myMarker = null;
//     var watchOptions;

// // get current position
// navigator.geolocation.getCurrentPosition(showPosition);

// // show current position on map
// function showPosition(position) {
//    myMarker = new google.maps.Marker({
//       position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
//       map : new google.maps.Map(document.getElementById("map")),
//       center: {lat: 18.4915, lng: 73.8217},
//         zoom: 10
//       //icon: 'C:/Users/Shree/Pictures/marker.png'
      
//   });
// }

// // watch user's position
// navigator.geolocation.watchPosition(watchSuccess, watchError, watchOptions);

// watchOptions = {
//  enableHighAccuracy: false,
//  timeout: 5000,
//  maximumAge: 0
// };

// function watchError(err) {
//      console.warn('ERROR(' + err.code + '): ' + err.message);
//    }

// // change marker location everytime position is updated
// function watchSuccess(position) {
//     var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
//     // set marker position
//     //myMarker.setPosition(latLng);
// }
//-----------------------------------------II method------------------------------------------------------
// var id,target,options,myMarker=null;
// let watch = this.geolocation.watchPosition();
// target = {
//   latitude : 18.48726,
//   longitude : 73.81486
// };
// options = {
//   enableHighAccuracy: false,
//   //timeout
//   maximumAge: 0
// };
// watch.subscribe((data) => {
//  // data can be a set of coordinates, or an error (if an error occurred).
//  this.latitude = data.coords.latitude.toPrecision(7); 
//  this.longitude =data.coords.longitude.toPrecision(7);
//  console.log(this.latitude,this.longitude);
//  target = {
//   latitude : 18.48726,
//   longitude : 73.81486
// };
// //  if(target.latitude === this.latitude && target.longitude === this.longitude){
// //   console.log('Congratulations');
// //   navigator.geolocation.clearWatch(id);
// // }
// });

// function success(pos) {
//   var crd = pos.coords;
//   if(target.latitude === crd.latitude && target.longitude === crd.longitude){
//     console.log('Congratulations 123');
//     navigator.geolocation.clearWatch(id);
//   }
// }
// function error(err) {
//   console.warn('ERROR(' + err.code + '): ' + err.message);
// }

// id = navigator.geolocation.watchPosition(success, error, options);
  //}
  //--------------------------------------------------------------------------------------------
}
