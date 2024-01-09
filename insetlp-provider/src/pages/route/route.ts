import { Component,ViewChild, ElementRef  } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { DisplayInfoProvider } from '../../providers/display-info/display-info';
import { Geolocation } from '@ionic-native/geolocation';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operator/map';
import { AcceptRequestPage } from '../accept-request/accept-request';

declare var google;

@Component({
  selector: 'page-route',
  templateUrl: 'route.html',
})
export class RoutePage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
infowindow = new google.maps.InfoWindow;

textforButton: String ='Click to see your first check point';
text: String = 'Final Price to be Paid here :';
flag = false;
reference:any;
currentIndexToShow:number = 0;
finalPrice=0;
totalPrice=0;
i=0;
k=0;
j=0;
clat :any=[];
clong :any=[];
lat:any;
long:any;
first1;
first2;
second1;
second2;
urlString;

constructor(public navCtrl: NavController, public navParams: NavParams,private g: DisplayInfoProvider,public geolocation: Geolocation) {
  console.log(this.g.cart);
    for(this.k=1;this.k<this.g.cart[0].length+1;this.k++)
    {
      this.clong[this.k] = this.g.cart[0][this.k-1].placeLong; 
      this.clat[this.k] = this.g.cart[0][this.k-1].placeLat; 
      console.log(" lats: "+this.clat[this.k]+" longs: "+this.clong[this.k]);
    }
    this.clat[this.k] = this.g.cart[0][0].cust_lat; 
    this.clong[this.k] = this.g.cart[0][0].cust_long; 
  }

async  nextButtonClick() {
    this.finalPrice=0;
    console.log(this.currentIndexToShow);
   

    if(this.currentIndexToShow == this.g.cart[0].length)
    {
      let directionsService = new google.maps.DirectionsService;
      let directionsDisplay = new google.maps.DirectionsRenderer;
      directionsDisplay.setMap(this.map);
     
      var geocoder = new google.maps.Geocoder;
      //directionsDisplay.setMap(null);
      console.log("src: "+this.clat[this.j]+"  "+this.clong[this.j]);
      console.log("dest: "+this.clat[this.j+1]+"  "+this.clong[this.j+1]);
      directionsService.route({
        origin: {lat: parseFloat(this.clat[this.j]), lng: parseFloat(this.clong[this.j]) },
        destination: {lat: parseFloat(this.clat[this.j+1]), lng: parseFloat(this.clong[this.j+1]) },
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
      this.totalPrice = this.totalPrice+20;
      this.finalPrice = this.totalPrice;
      this.textforButton = 'Done.. reach the customer and then click';
      this.text = 'Price to be collected from user';
      this.ShowDirections(this.clat[this.j],this.clong[this.j],this.clat[this.j+1],this.clong[this.j+1]);
      console.log("in if"+this.j);
      if(this.j == this.g.cart[0].length + 1)
        this.navCtrl.push(AcceptRequestPage);
      this.j = this.j+1;
    }
    else{
      let directionsService = new google.maps.DirectionsService;
      let directionsDisplay = new google.maps.DirectionsRenderer;
      directionsDisplay.setMap(this.map);
      
      var geocoder = new google.maps.Geocoder;
      //directionsDisplay.setMap(null);
      this.reference = this.g.cart[0][this.currentIndexToShow];
      console.log("in else"+this.j);
      for(this.i=0;this.i<this.g.cart[0][this.j].menu.length;this.i++)
      {
        this.finalPrice = this.finalPrice+(this.g.cart[0][this.j].menu[this.i].quantity*this.g.cart[0][this.j].menu[this.i].productPrice);
      }
      this.totalPrice = this.totalPrice+this.finalPrice;
      console.log("Total Price"+this.finalPrice);
      this.textforButton = 'next check point';
      
      //----------------------------------------------------------------- adding the path now
      // let directionsService = new google.maps.DirectionsService();
      // let directionsDisplay = new google.maps.DirectionsRenderer();
      // directionsDisplay.setMap(this.map);
      console.log("src: "+parseFloat(this.clat[this.j])+"  "+this.clong[this.j]);
      console.log("dest: "+this.clat[this.j+1]+"  "+this.clong[this.j+1]);
     
      directionsService.route({
        origin: {lat: parseFloat(this.clat[this.j]), lng: parseFloat(this.clong[this.j]) },
        destination: {lat: parseFloat(this.clat[this.j+1]), lng: parseFloat(this.clong[this.j+1]) },  
        travelMode: google.maps.TravelMode['DRIVING']
      },
      (res, status) => {
        if(status == google.maps.DirectionsStatus.OK)
        {
          //directionsDisplay.setMap(null);
          
           directionsDisplay.setDirections(res);

        }  
        else
        {
          console.warn(status);
        }
      });
      this.ShowDirections(this.clat[this.j],this.clong[this.j],this.clat[this.j+1],this.clong[this.j+1]);
      this.currentIndexToShow++;
      
      this.j++;
     
    }
  }
  
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

        console.log(this.lat+" "+this.long);
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