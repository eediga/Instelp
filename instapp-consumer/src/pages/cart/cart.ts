import { HTTP } from '@ionic-native/http';
import { CartDetailsPage } from './../cart-details/cart-details';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalCartProvider } from "../../providers/global-cart/global-cart";
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Geolocation } from '@ionic-native/geolocation';
import 'rxjs/add/operator/map';
import { LiveTrackPage } from '../live-track/live-track';

declare var google;
@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

    sum = 0;
    k=0;
    result : any;
    data : Observable<any>;
    data1 : Observable<any>;
    latitude:string;
    longitude;
    origin1 = {lat:0.0,lng:0.0} ;
    dest = [];
    matrixToSend :any={"matrix":[]};
    dummydata:any;
    output: JSON;
    output1:JSON;
    matrixString : string;
    matrixStart : string;
    obj: any = {"cart":
    this.global.cart
  // [
  // {"placeName": "value1", "productName": "value2"},
  // {"placeName": "value4", "productName": "value5"}, 
  // {"placeName": "value7", "productName": "value8"} 
  // ]
    };


constructor(public navCtrl: NavController, public navParams: NavParams,public global : GlobalCartProvider,
    private http: HttpClient,private geolocation : Geolocation,private httpMobile: HTTP) {
    console.log(this.global.cart);
    this.geolocation.getCurrentPosition().then((resp) => {  
      this.origin1 = {lat: resp.coords.latitude,lng:resp.coords.longitude};
      console.log(this.origin1.lat,this.origin1.lng);
     }).catch((error) => {
       console.log('Error getting location', error);
     });

  }

  ionViewDidLoad() {
    for(var i=0;i<this.global.cart.length;i++)
    {
      for(var j=0;j<this.global.cart[i].menu.length;j++)
      {
        this.sum = this.sum + (this.global.cart[i].menu[j].productPrice * this.global.cart[i].menu[j].quantity) ; 
      }
      
    }
    console.log(this.sum);
  }

  async Checkout()
  {
     console.log("inside post method");
    //  this.dummydata = {
    //     "matrix":["10 mins","10 mins","15 mins","20 mins","5 mins","0 mins","9 mins","10 mins","6 mins","13 mins","0 mins","12 mins","8 mins","8 mins","9 mins","0 mins"]
    // }
    //   var url = "http://192.168.0.100:8098/Instant_Help/rest/matrix/acceptMatrix";
    //  this.data = this.http.post(url,this.matrixString);
     
    //  this.data.subscribe(data => {
    //      console.log(data);
    //      this.result = data;
    //      console.log(this.result);
    //  },error=>{
    //      console.log(error);
    //     });

//****************************************** For Mobile ******************************************
        // var url = "http://192.168.0.109:8098/Instant_Help/rest/hello/finalCart";
        // this.output = <JSON>this.obj;
        // this.httpMobile.setDataSerializer('json');
        // await this.httpMobile.post(url,this.output,{}).then(data1 => {
        //     this.result = JSON.parse(data1.data);
        //     console.log(this.result);
        // })
        // .catch(error => {

        //   console.log(error.status);
        //   console.log(error.error); // error message as string
        //   console.log(error.headers);

        // });
//-------------------------------------END--------------------------------------------------------

//************************************* *working cart for website*********************************
     
        this.output = <JSON>this.obj;
        var url = "http://192.168.0.112:8098/Instant_Help/rest/hello/finalCart";
        
        this.data = await this.http.post(url,this.output);
        this.data.map(res => res as JSON).subscribe(data => {
            console.log(data);
            this.result = data;
            console.log(this.result);
        },error=>{
            console.log(error);
          });
//-------------------------------------END--------------------------------------------------------
      await this.calculateMatrix();
      //await this.FormMatrix();
  }


  async calculateMatrix()
  {
        
    var bounds = new google.maps.LatLngBounds;
    var markersArray = [];
 
    for(var i=0;i<this.global.cart.length;i++)
    {
      this.dest[i] = {lat: parseFloat(this.global.cart[i].placeLat), lng: parseFloat(this.global.cart[i].placeLong)};
    }
    var destinationIcon = 'https://chart.googleapis.com/chart?' +
        'chst=d_map_pin_letter&chld=D|FF0000|000000';
    var originIcon = 'https://chart.googleapis.com/chart?' +
        'chst=d_map_pin_letter&chld=O|FFFF00|000000';

        var geocoder = new google.maps.Geocoder;

        var service = new google.maps.DistanceMatrixService;
        service.getDistanceMatrix({
          origins: [this.origin1],
          destinations: this.dest,
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
              document.getElementById('srcToAllDest').innerHTML = sourceToAllDestination;
                console.log(sourceToAllDestination);
            }
            
          }
        });

    console.log(document.getElementById('srcToAllDest').innerHTML); 
    this.matrixStart = await document.getElementById('srcToAllDest').innerHTML;


//***************************************** For Mobile ***************************************** */

        // var url = "http://192.168.0.109:8098/Instant_Help/rest/hellodriver/mobile/sendDriverLatLongForCal";
        //  this.httpMobile.setDataSerializer('json');
        // await this.httpMobile.post(url,
        //   {
        //     sourceToMultiple : this.matrixStart
        //   },{}).then(data1 => {
        //     this.result = data1.data;
        //     console.log(this.result);
        // })
        // .catch(error => {

        //   console.log(error.status);
        //   console.log(error.error); // error message as string
        //   console.log(error.headers);

        // });
//-------------------------------------END--------------------------------------------------------

//************************* */working cart for website********************************************

    var url = "http://192.168.0.112:8098/Instant_Help/rest/hellodriver/sendDriverLatLongForCal";
      
    this.data = await this.http.post(url,this.matrixStart);
    this.data.map(res=>res as JSON).subscribe(data => {
        console.log(data);
        this.result = data;
        console.log(this.result);
    },error=>{
        console.log(error);
    })
//-------------------------------------END--------------------------------------------------------

}


  
async FormMatrix()
  {
    
    for(var i=0;i<this.global.cart.length;i++)
    {
      this.dest[i] = {lat: parseFloat(this.global.cart[i].placeLat), lng: parseFloat(this.global.cart[i].placeLong)};
     // console.log("dest"+this.dest[i]);
    }
    let bounds = new google.maps.LatLngBounds;
    let markersArray = [];
 
 
    let destinationIcon = 'https://chart.googleapis.com/chart?' +
        'chst=d_map_pin_letter&chld=D|FF0000|000000';
    let originIcon = 'https://chart.googleapis.com/chart?' +
        'chst=d_map_pin_letter&chld=O|FFFF00|000000';

        let geocoder = new google.maps.Geocoder;

        let service = new google.maps.DistanceMatrixService;
        service.getDistanceMatrix({
          origins: this.dest,
          destinations: this.dest,
          travelMode: 'DRIVING',
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
        }, function(response, status) {
          if (status !== 'OK') {
            alert('Error was: ' + status);
          } else {
            let originList = response.originAddresses;
            let destinationList = response.destinationAddresses;
            let matrixsend = [];
            let stringToSend = '';
            for (let i = 0; i < originList.length; i++) {
              let results = response.rows[i].elements;
              
              for (let j = 0; j < results.length; j++) {
                // matrixsend.push(results[j].duration.text);
                // this.k = this.k +1;
                stringToSend = stringToSend+ results[j].duration.text +",";
              }
              document.getElementById('jugad').innerHTML = stringToSend;
                console.log(stringToSend);
            }
          }
        });


this.matrixString =  document.getElementById('jugad').innerHTML;
console.log(this.matrixString);
//  this.dummydata = {
//   "matrix":["10 mins","10 mins","15 mins","20 mins","5 mins","0 mins","9 mins","10 mins","6 mins","13 mins","0 mins","12 mins","8 mins","8 mins","9 mins","0 mins"]
//  }

//***************************************** For Mobile ***************************************** */
            // var url = "http://192.168.0.109:8098/Instant_Help/rest/matrix/mobile/acceptMatrix";
            // this.httpMobile.setDataSerializer('json');
            // await this.httpMobile.post(url,{
            //   matrix :this.matrixString 
            // },{}).then(data1 => {
            //     this.result = data1.data;
            //     console.log(this.result);
            //     //this.navCtrl.push(LiveTrackPage,{route:this.result});
            // })
            // .catch(error => {
    
            //   console.log(error.status);
            //   console.log(error.error); // error message as string
            //   console.log(error.headers);
    
            // });
//-------------------------------------END--------------------------------------------------------

//************************* */working cart for website********************************************

            var url = "http://192.168.0.112:8098/Instant_Help/rest/matrix/acceptMatrix";
                  
            this.data = await this.http.post(url,this.matrixString);
            this.data.map(res=>res as JSON).subscribe(data => {
                console.log(data);
                this.result = data;
                console.log(this.result);
            },error=>{
                console.log(error);
            })
//-------------------------------------END--------------------------------------------------------
           
}
getBillAmount(){
  for(var i=0;i<this.global.cart.length;i++)
  {
    this.sum = this.sum + (this.global.cart[i].productPrice * this.global.cart[i].quantity);
  }
  console.log(this.sum);
}

AddAdress()
{
  
}
  // proccedToCheckout()
  // {
  //     this.output = <JSON>this.obj;
  //     // this.calculateMatrix();
  //     // this.FormMatrix;
  //     console.log(this.matrixToSend);
  //     //POST METHOD
  //     var url = "http://192.168.43.120:8098/Instant_Help/rest/hello/finalCart";
  //     this.data = this.http.post(url,this.output);
  //     this.data.subscribe(data => {
  //         console.log(data);
  //         this.result = data;
  //         console.log(this.result);
  //     },error=>{
  //         console.log(error);
  //     })    
  // }
//   PostData()
//   {

//     this.output = <JSON>this.obj;
// //    console.log(this.global.cart);
// //    console.log(this.output);
    
//     // var url = "http://192.168.0.103:8098/Instant_Help/rest/hello/finalCart";
  
//     // this.data = this.http.post(url,this.output);
    
//     // this.data.subscribe(data => {
//     //     console.log(data);
//     //     this.result = data;
//     //     console.log(this.result);
//     // },error=>{
//     //     console.log(error);
//     // })
//   }
 
}



































//  for(var i=0;i<this.global.cart.length;i++)
    //  {
    //    this.dest[i] = {lat: parseFloat(this.global.cart[i].placeLat), lng: parseFloat(this.global.cart[i].placeLong)};
    //   // console.log("dest"+this.dest[i]);
    //  }
 
 
    //  var bounds = new google.maps.LatLngBounds;
    //  var markersArray = [];
  
  
    //  var destinationIcon = 'https://chart.googleapis.com/chart?' +
    //      'chst=d_map_pin_letter&chld=D|FF0000|000000';
    //  var originIcon = 'https://chart.googleapis.com/chart?' +
    //      'chst=d_map_pin_letter&chld=O|FFFF00|000000';
 
    //      var geocoder = new google.maps.Geocoder;
 
    //      var service = new google.maps.DistanceMatrixService;
    //      service.getDistanceMatrix({
    //        origins: this.dest,
    //        destinations: this.dest,
    //        travelMode: 'DRIVING',
    //        unitSystem: google.maps.UnitSystem.METRIC,
    //        avoidHighways: false,
    //        avoidTolls: false
    //      }, function(response, status) {
    //        if (status !== 'OK') {
    //          alert('Error was: ' + status);
    //        } else {
    //          var originList = response.originAddresses;
    //          var destinationList = response.destinationAddresses;
    //          var matrixsend = [];
    //          let stringToSend = '';
    //          for (var i = 0; i < originList.length; i++) {
    //            var results = response.rows[i].elements;
               
    //            for (var j = 0; j < results.length; j++) {
    //              matrixsend.push(results[j].duration.text);
    //              this.k = this.k +1;
    //              console.log(matrixsend);
    //              stringToSend = stringToSend+ results[j].duration.text +",";
    //             document.getElementById('jugad').innerHTML = stringToSend;
    //             console.log(stringToSend);
    //            }
    //          }
    //         //  this.matrixToSend = {"matrix":
    //         //     matrixsend
    //         //  };
    //         //  this.output1 = <JSON>this.matrixToSend;
    //         //  console.log(this.output1);
    //         //  console.log(this.matrixToSend);
    //         //  console.log(this.matrixToSend.matrix.length);
    //        }
    //      });
 