// import { Component,ViewChild, ElementRef } from '@angular/core';
// import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { DisplayInfoProvider } from '../../providers/display-info/display-info';
// import { Geolocation } from '@ionic-native/geolocation';
// import 'rxjs/add/operator/map';
// import { map } from 'rxjs/operator/map';
// import { AcceptRequestPage } from '../accept-request/accept-request';

// declare var google;

// /**
//  * Generated class for the ForgottenRoutePage page.
//  *
//  * See https://ionicframework.com/docs/components/#navigation for more info on
//  * Ionic pages and navigation.
//  */

// @IonicPage()
// @Component({
//   selector: 'page-forgotten-route',
//   templateUrl: 'forgotten-route.html',
// })
// export class ForgottenRoutePage {
// @ViewChild('map') mapElement: ElementRef;
// map: any;
// infowindow = new google.maps.InfoWindow;
// urlString;
// accept_terms ;
// lat;
// long;
// next= "Next";
// clat :any=[];
// clong :any=[];
// k=1;
// i=0;
// nav = "Navigate to source";
// visible = false;
// text = "Go to Source";
// product : boolean=false;
// hello : boolean=true;
// pickup : boolean=true; 
// cnt=0;
// reference:any;
//   constructor(public navCtrl: NavController, public navParams: NavParams,private g: DisplayInfoProvider,public geolocation: Geolocation) {
//     console.log(this.g.cart);
//       this.clat[1] = this.g.cart[0][0].srcLat; 
//       this.clong[1] = this.g.cart[0][0].srcLong; 
//       console.log(" lats: "+this.clat[0]+" longs: "+this.clong[1]);
//       this.clat[2] = this.g.cart[0][0].destLat; 
//       this.clong[2] = this.g.cart[0][0].destLong; 
//       for(this.k = 0;this.k<3;this.k++)
//       {
//         console.log(" "+this.clat[this.k]+" "+this.clong[this.k]);
//       }
//     }

//   navigation()
//   {
//     this.cnt++;
//     this.product = true;
//     this.hello = false;

//     if(this.cnt == 1)
//       this.hello = false;

//     if(this.cnt == 2)
//       this.pickup = false;
      
//       let directionsService = new google.maps.DirectionsService;
//       let directionsDisplay = new google.maps.DirectionsRenderer;
//       directionsDisplay.setMap(this.map);
//       this.reference = this.g.cart[0][0];
//       directionsService.route({
//         origin: {lat: parseFloat(this.clat[this.i]), lng: parseFloat(this.clong[this.i]) },
//         destination: {lat: parseFloat(this.clat[this.i + 1]), lng: parseFloat(this.clong[this.i + 1]) },
//         travelMode: google.maps.TravelMode['DRIVING']
//        },
//        (res, status) => {
  
//         if(status == google.maps.DirectionsStatus.OK)
//         {
//             directionsDisplay.setDirections(res);
//         }
//         else
//         {
//             console.warn(status);
//         }
//       });
//       this.ShowDirections(this.clat[this.i],this.clong[this.i],this.clat[this.i+1],this.clong[this.i+1]);
//       this.i++;
//       if(this.i == 1)
//       {
//         this.next = "Go to Source";
        
//       }
//       if(this.i == 2)
//       {
//         this.next = "Go to Destination";
//         this.nav = "Navigate to destination";
//       }
      
     
//       if(this.i == 3)
//       {
//         console.log("thank you");
//         this.next = "thankyou";
//         this.navCtrl.push(AcceptRequestPage);
//       }
//   }

//   //============================================= Map Display =====================================

//   ionViewDidLoad() {
//     this.loadMap();
//  }
//    loadMap(){
   
//     this.geolocation.getCurrentPosition().then((position)=>{
    
//       let latLng = new google.maps.LatLng(position.coords.latitude,
//                                           position.coords.longitude);
//         this.lat = position.coords.latitude;
//         this.long = position.coords.longitude;

//         this.clat[0] = this.lat;
//         this.clong[0] = this.long;

//         console.log(this.clat[1]+" "+this.long);
//         //console.log(latLng)
//       let mapOptions = {
//         center: latLng,
//         zoom: 15,
//         mapTypeId: google.maps.MapTypeId.ROADMAP
//       }
    
//     this.map = new google.maps.Map(this.mapElement.nativeElement, 
//     mapOptions);
//     this.addMarker(); 
    
//     }, (err) => {
//       console.log(err);
//     });
    
// }

// addMarker(){
  
//   let marker = new google.maps.Marker({
//     map: this.map,
//     animation: google.maps.Animation.DROP,
//     position: this.map.getCenter()
//   });
//   let content = "<h4>Information!</h4>";          
//   this.addInfoWindow(marker, content);
// }
// addInfoWindow(marker, content){
  
//     let infoWindow = new google.maps.InfoWindow({
//       content: content
//     });

//     google.maps.event.addListener(marker, 'click', () => {
//     infoWindow.open(this.map, marker);
//     });

//   }
//   ShowDirections(first1,first2,second1,second2)
//   {
//     this.urlString = "https://www.google.com/maps/dir/?api=1&origin="+first1+","+first2+"&destination="
//     +second1+","+second2;

//     console.log(this.urlString);
//   }

// }


//**************************************************************************************************** */

import { Component,ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DisplayInfoProvider } from '../../providers/display-info/display-info';
import { Geolocation } from '@ionic-native/geolocation';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operator/map';
import { AcceptRequestPage } from '../accept-request/accept-request';

declare var google;

/**
 * Generated class for the ForgottenRoutePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgotten-route',
  templateUrl: 'forgotten-route.html',
})
export class ForgottenRoutePage {
@ViewChild('map') mapElement: ElementRef;
map: any;
infowindow = new google.maps.InfoWindow;
urlString;
accept_terms ;
lat;
long;
next= "Next";
clat :any=[];
clong :any=[];
val:any=[];
time = 0;
cost = 0;
k=1;
i=0;
nav = "Navigate to source";
visible = false;
text = "Go to Source";
product : boolean=false;
hello : boolean=true;
pickup : boolean=true; 
size:any;

cnt=0;
reference:any;
origin1 = {lat:0.0,lng:0.0} ;
destination1 = {lat:0.0,lng:0.0} ;
  constructor(public navCtrl: NavController, public navParams: NavParams,private g: DisplayInfoProvider,public geolocation: Geolocation) {
    console.log(this.g.cart);
      this.clat[1] = this.g.cart[0][0].srcLat; 
      this.clong[1] = this.g.cart[0][0].srcLong; 
      this.size = this.g.cart[0][0].srcLat;
      console.log(" lats: "+this.clat[0]+" longs: "+this.clong[1]);
      this.clat[2] = this.g.cart[0][0].destLat; 
      this.clong[2] = this.g.cart[0][0].destLong; 
      for(this.k = 0;this.k<3;this.k++)
      {
        console.log(" "+this.clat[this.k]+" "+this.clong[this.k]);
      }
      this.origin1 = {lat: parseFloat(this.clat[1]), lng:parseFloat(this.clong[1])};
      this.destination1 = {lat: parseFloat(this.clat[2]), lng:parseFloat(this.clong[2])};

      var geocoder = new google.maps.Geocoder;

        var service = new google.maps.DistanceMatrixService;
        service.getDistanceMatrix({
          origins: [this.origin1],
          destinations: [this.destination1],
          travelMode: 'DRIVING',
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
        }, function(response, status) {
          if (status !== 'OK') {
            alert('Error was: ' + status);
          } else {
            var originList = response.originAddresses;
            var destinationList = response.destinationAddresses;
            
            for (var i = 0; i < originList.length; i++) {
              var results = response.rows[i].elements;
              let sourceToAllDestination = '';
              for (var j = 0; j < results.length; j++) {
                sourceToAllDestination = sourceToAllDestination + results[j].duration.text +",";
                
                 console.log(results);
              }
              console.log(sourceToAllDestination);

              this.val = sourceToAllDestination.split(' ');
              console.log(this.val[0]); 
              this.time = Number(this.val[0]);
              this.time = this.time / 2;
              console.log(this.time);
              this.cost = this.time * 5;
              console.log(this.size);
               if(this.size == "small")
               {
                 this.cost = this.cost + 10;
               }
              // else if(this.g.cart[0][0].sizeOfProduct == "medium")
              // {
              //   this.cost = this.cost + 20;
              // }
              // else
              // {
              //   this.cost = this.cost + 30;
              // }
            }
            document.getElementById('srcToAllDest').innerHTML = this.cost;
          }
        });


    }

  navigation()
  {
    this.cnt++;
    this.product = true;
    this.hello = false;

    if(this.cnt == 1)
      this.hello = false;

    if(this.cnt == 2)
      this.pickup = false;
      
      let directionsService = new google.maps.DirectionsService;
      let directionsDisplay = new google.maps.DirectionsRenderer;
      directionsDisplay.setMap(this.map);
      this.reference = this.g.cart[0][0];
      directionsService.route({
        origin: {lat: parseFloat(this.clat[this.i]), lng: parseFloat(this.clong[this.i]) },
        destination: {lat: parseFloat(this.clat[this.i + 1]), lng: parseFloat(this.clong[this.i + 1]) },
        travelMode: google.maps.TravelMode['DRIVING']
       },
       (res, status) => {
  
        if(status == google.maps.DirectionsStatus.OK)
        {
            directionsDisplay.setDirections(res);
        }
        else
        {
            console.warn(status);
        }
      });
      this.ShowDirections(this.clat[this.i],this.clong[this.i],this.clat[this.i+1],this.clong[this.i+1]);
      this.i++;
      if(this.i == 1)
      {
        this.next = "Go to Source";
        
      }
      if(this.i == 2)
      {
        this.next = "Go to Destination";
        this.nav = "Navigate to destination";
      }
      
     
      if(this.i == 3)
      {
        console.log("thank you");
        this.next = "thankyou";
        this.navCtrl.push(AcceptRequestPage);
      }
  }

  //============================================= Map Display =====================================

  ionViewDidLoad() {
    this.loadMap();
 }
   loadMap(){
   
    this.geolocation.getCurrentPosition().then((position)=>{
    
      let latLng = new google.maps.LatLng(position.coords.latitude,
                                          position.coords.longitude);
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;

        this.clat[0] = this.lat;
        this.clong[0] = this.long;

        console.log(this.clat[1]+" "+this.long);
        //console.log(latLng)
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
    
    this.map = new google.maps.Map(this.mapElement.nativeElement, 
    mapOptions);
    this.addMarker(); 
    
    }, (err) => {
      console.log(err);
    });
    
}

addMarker(){
  
  let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: this.map.getCenter()
  });
  let content = "<h4>Information!</h4>";          
  this.addInfoWindow(marker, content);
}
addInfoWindow(marker, content){
  
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
    });

  }
  ShowDirections(first1,first2,second1,second2)
  {
    this.urlString = "https://www.google.com/maps/dir/?api=1&origin="+first1+","+first2+"&destination="
    +second1+","+second2;

    console.log(this.urlString);
  }

}

