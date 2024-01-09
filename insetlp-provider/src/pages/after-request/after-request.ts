import { Component,ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { HttpClient} from '@angular/common/http';
import { DisplayInfoProvider } from '../../providers/display-info/display-info';
import { Observable } from 'rxjs/Observable';
import { Geolocation } from '@ionic-native/geolocation';
import 'rxjs/add/operator/map';
/**
 * Generated class for the AfterRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
@IonicPage()
@Component({
  selector: 'page-after-request',
  templateUrl: 'after-request.html',
})

export class AfterRequestPage {
flag;
@ViewChild('map') mapElement: ElementRef;

placeName;
  placeLat;
  placeLong;
  placeLocation;
  menu = [];
  productName;
  productPrice;
  map: any;
  data : Observable<any>;
  output: JSON;
  result: any;
i=0;
j=0;
  constructor(public navCtrl: NavController,public geolocation: Geolocation,private g : DisplayInfoProvider,
    public navParams: NavParams,private http: HttpClient,private httpMobile: HTTP) {
   // this.flag = this.navParams.get('flag');
    //console.log(this.flag);
  }
  ionViewDidLoad() {
    this.loadMap();
    //this.addMarker();   
 
   }
   loadMap(){
   
    this.geolocation.getCurrentPosition().then((position)=>{
    
      let latLng = new google.maps.LatLng(position.coords.latitude,
                                          position.coords.longitude);
    
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
    
    this.map = new google.maps.Map(this.mapElement.nativeElement, 
    mapOptions);
    //this.addMarker(); 
    
    }, (err) => {
      console.log(err);
    });
    
    }
  async AcceptRequestCart()
  {
    // if(this.flag == 1)
    // {
      console.log("inside Function");

//-----------------------------For Mobile----------------------------------------------
  var url = "http://192.168.0.109:8098/Instant_Help/rest/hello/sendCoordinatesToDriver";
  await this.httpMobile.get(url,{}, {}
      ).then(data1 => {
        this.result = JSON.parse(data1.data);
        console.log(this.result);
  console.log(this.result[0].flag);
  this.i=0;
  this.j=0;
 
     console.log("Inside if");
     for(this.i=0;this.i<this.result.length;this.i++)
     {
   
       console.log("****************")
       this.placeLocation = this.result[this.i].placeLocation;
       this.placeLat = this.result[this.i].placeLat;
       this.placeLong = this.result[this.i].placeLong;
       this.placeName = this.result[this.i].placeName;
       console.log("****************")
   
    
       for(this.j=0;this.j<this.result[this.i].menu.length;this.j++){
         this.menu[this.j] = this.result[this.i].menu[this.j].productName;
         console.log(this.result[this.i].menu[this.j].productName);
       }
     }
     this.g.cart.push(this.result);
     console.log(this.g.cart);
     
  
})
.catch(error => {
console.log(error);
console.log(error.status);
console.log(error.error); // error message as string
console.log(error.headers);

});
    // }
    // else if(this.flag == 0)
    // {

    // }
    // else{
    //   console.log("Haven.t received any request yet");
    // }
  }

}
