import { Component,ViewChild, ElementRef  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import 'rxjs/add/operator/map';
import { RoutePage } from '../route/route';
import { DisplayInfoProvider } from '../../providers/display-info/display-info';
import { HTTP } from '@ionic-native/http';
import { AfterRequestPage } from '../after-request/after-request';
import { ForgottenRoutePage } from '../forgotten-route/forgotten-route';


declare var google;
@IonicPage()
@Component({
  selector: 'page-accept-request',
  templateUrl: 'accept-request.html',
})
export class AcceptRequestPage {
  @ViewChild('map') mapElement: ElementRef;
  user = {
    username :'',
    password : ''
  };
  CheckStatus = "Offline";
  cart;
  checkOnline : boolean=false;
  public isToggled: boolean;
  checkString:String;
  //-------- --------
  srcLat;
  srcLong;
  destLat;
  destLong;
  currLat;
  currLong;
  sizeOfProduct;
  typeOfProduct;
  weightOfProduct;
  srcAddr;
  destAddr;
  flag;
  //-------------------
  placeName;
  placeLat;
  placeLong;
  placeLocation;
  menu = [];
  productName;
  productPrice;
  //--------------------
  map: any;
  data : Observable<any>;
  output: JSON;
  result: any;
  res: any;
  urlString;
  infowindow = new google.maps.InfoWindow;
  obj1 : any;
  i;
  j;
  obj: any = {
    "nouse":[
		{
	"placeName" : "Vaishali",
	"placeLat":78.5487,
	"placeLong" : 18.5695,
	"placeLocation":"FC",
	"Menu":[
		{"productName" : "Vadapav","productPrice":12,"quantity":2},
		{"productName" : "Dosa","productPrice":80,"quantity":1}
	]
     
	},
	{
"placeName" : "Sheetal",
	"placeLat":79.12487,
	"placeLong" : 17.6695,
	"placeLocation":"Karvengar",
	"Menu":[
		{"productName" : "Vadapav","productPrice":12,"quantity":2},
		{"productName" : "Dosa","productPrice":80,"quantity":1},
		{"productName" : "Raita","productPrice":30,"quantity":1}
	]}
  ]
};
 
obj2: any = [
  {
      "menu": [
          {
              "productName": "Vadapav",
              "productPrice": 12,
              "quantity": "2"
          },
          {
              "productName": "Dosa",
              "productPrice": 80,
              "quantity": "1"
          }
      ],
      "placeLat": "18.5209",
      "placeLocation": "FC",
      "placeLong": "73.8412",
      "placeName": "Vaishali"
  },
  {
      "menu": [
          {
              "productName": "Vadapav",
              "productPrice": 12,
              "quantity": "2"
          },
          {
              "productName": "Dosa",
              "productPrice": 80,
              "quantity": "1"
          },
          {
              "productName": "Raita",
              "productPrice": 30,
              "quantity": "1"
          }
      ],
      "placeLat": "18.5324",
      "placeLocation": "Karvengar",
      "placeLong": "73.8298",
      "placeName": "J W Marriot"
  },
  {
      "menu": [
          {
              "productName": "Vadapav",
              "productPrice": 12,
              "quantity": "2"
          },
          {
              "productName": "Dosa",
              "productPrice": 80,
              "quantity": "1"
          },
          {
              "productName": "Raita",
              "productPrice": 30,
              "quantity": "1"
          }
      ],
      "placeLat": "18.5245",
      "placeLocation": "Karvengar",
      "placeLong": "73.8416",
      "placeName": "Shabree"
  }
]
audio;
  constructor(public navCtrl: NavController,public geolocation: Geolocation,private g : DisplayInfoProvider,
     public navParams: NavParams,private http: HttpClient,public toastCtrl: ToastController,private httpMobile: HTTP) {
     this.currLat= this.navParams.get('lat');
      this.currLong=this.navParams.get('long');
      this.isToggled = false;
  }
   toggled()
  {
    console.log("Toggled: "+ this.isToggled); 
    this.CheckStatus = "You are Online"
    this.checkOnline = true; 
    this.audio = new Audio("assets/audio1/alarm.mp3");
    this.audio.play();
    
  }
  async Ignore()
  {
    this.audio.pause();
    this.navCtrl.push(AcceptRequestPage);
  }
  async AcceptRequestCart()
  {
    console.log("inside Function");
    console.log(this.checkOnline);
    this.audio.pause();

//-----------------------------For Mobile----------------------------------------------

//******************************* Start ********************************************** */

//     if(this.checkOnline == true)
//     {
//       var url = "http://192.168.0.103:8098/Instant_Help/rest/hello/sendCompleteDetails";
//       //var url = "http://192.168.0.108:8098/Instant_Help/rest/hello/sendCoordinatesToDriver";
//       await this.httpMobile.get(url,{}, {}
//           ).then(data1 => {
//             this.result = JSON.parse(data1.data);
//             console.log(this.result);
//       console.log(this.result[0].flag);
//       this.i=0;
//       this.j=0;

//   //============================== Cart ================================================
//   if(this.result[0].flag == "cart")
//    {
//      console.log("Inside if");
//      for(this.i=0;this.i<this.result.length;this.i++)
//      {
   
//        console.log("****************")
//        this.placeLocation = this.result[this.i].placeLocation;
//        this.placeLat = this.result[this.i].placeLat;
//        this.placeLong = this.result[this.i].placeLong;
//        this.placeName = this.result[this.i].placeName;
//        console.log("****************")
   
    
//        for(this.j=0;this.j<this.result[this.i].menu.length;this.j++){
//          this.menu[this.j] = this.result[this.i].menu[this.j].productName;
//          console.log(this.result[this.i].menu[this.j].productName);
//        }
//      }
//      this.g.cart.push(this.result);
//      console.log(this.g.cart);
//      this.navCtrl.push(RoutePage);
//   }
// //============================== Forgotten ================================================
//   else
//   {
//       console.log("Inside Else");
//       console.log(this.result[0].srcLat);
//       this.srcLat = this.result[0].srcLat;
//       this.srcLong = this.result[0].srcLong;
//       this.destLat = this.result[0].destLat;
//       this.destLong = this.result[0].destLong;
//       this.sizeOfProduct = this.result[0].sizeOfProduct;
//       this.typeOfProduct = this.result[0].typeOfProduct;
//       this.weightOfProduct = this.result[0].weightOfProduct;
//       this.srcAddr = this.result[0].srcAddr;
//       this.destAddr = this.result[0].destAddr;
//       this.g.cart.push(this.result);
//       console.log(this.g.cart);
//       this.navCtrl.push(ForgottenRoutePage);
//     }
//   })
//   .catch(error => {
//   console.log(error);
//   console.log(error.status);
//   console.log(error.error); // error message as string
//   console.log(error.headers);
//     });
//   }
//   else{
//     console.log("Wrongg"+this.checkOnline);
//   }

//********************************** End ********************************************* */


//---------------------------------  For Website ---------------------------------------

//******************************* Start ********************************************** */

   this.output = this.obj;
   //this.audio.pause();
   var url = "http://192.168.0.103:8098/Instant_Help/rest/hello/sendCompleteDetails";
   console.log("inside get method");
    this.http.get(url).map(res => res as JSON).subscribe(data => {
      console.log("Heelloooo");
        console.log(data);
        this.result = data;
         console.log(this.result);
         console.log(this.result.length);
         this.i=0;
         this.j=0;

         //============================== Cart ================================================

         if(this.result[0].flag == "cart")
          {
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
      this.navCtrl.push(RoutePage);
         }

         //============================== Forgotten ================================================
          
        else
            {
              console.log("Inside Else");
      console.log(this.result[0].srcLat);
      this.srcLat = this.result[0].srcLat;
      this.srcLong = this.result[0].srcLong;
      this.destLat = this.result[0].destLat;
      this.destLong = this.result[0].destLong;
      this.sizeOfProduct = this.result[0].sizeOfProduct;
      this.typeOfProduct = this.result[0].typeOfProduct;
      this.weightOfProduct = this.result[0].weightOfProduct;
      this.srcAddr = this.result[0].srcAddr;
      this.destAddr = this.result[0].destAddr;
      this.g.cart.push(this.result);
      console.log(this.g.cart);
      this.navCtrl.push(ForgottenRoutePage);
            }
    } ,error=>{
      console.log(error);
    });

//********************************** End ********************************************* */

     
  }
///%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Timepass%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // AcceptRequest()
  // {
  //   console.log("inside post method");
    
  //   this.output = <JSON>this.obj;
  //    //var url = "http://192.168.0.111:8098/Instant_Help/rest/hello/sendCart";
  //    var url = "http://192.168.0.101:8098/Instant_Help/rest/hello/sendForgotten";
   
  //    this.http.post(url,this.output).map(res => res as JSON).subscribe(data => {
  //        console.log(data);
  //        this.result = data;
  //        console.log(this.result);
  //        console.log(this.result[0].srcLat);
  //        this.srcLat = this.result[0].srcLat;
  //        this.srcLong = this.result[0].srcLong;
  //        this.destLat = this.result[0].destLat;
  //        this.destLong = this.result[0].destLong;
  //        this.startNavigating();
         
  //        //console.log(this.result.srcLong );
  //    },error=>{
  //        console.log(error);
  //      });

  // console.log(this.urlString);

  // }
  //  checkString1()
  // {
  //   console.log("Hii");

  //   //------------------------ Mobile ------------------------------------------
  //   var url = "http://192.168.0.109:8098/Instant_Help/rest/hello/sendflag";
  //    this.httpMobile.get(url,{
  //     tp:"timepass"
  //   }, {}
  //       ).then(data1 => {
  //         this.result = data1.data;
  //         console.log(this.result);
  //       if(data1.data == 1)
  //       {
  //         console.log("Inside If");
  //         this.cart = 1;
  //         console.log(this.cart);
  //         // this.navCtrl.push(AfterRequestPage,
  //         //   {
  //         //     flag:this.cart
  //         //   });
          
  //       }
  //       else if(data1.data == 0)
  //       {
  //         console.log("Inside Else");
  //        // this.AcceptRequest();
  //       }
  //       else
  //       {
  //         console.log("Not received any order yet");
  //       }
  //       })
  //       .catch(error => {
  //         console.log(error.headers);
      
  //       });
//******************************** To Next Page ******************* */
      

 //---------------------------------------------------------------------------
   
    // var url = "http://192.168.0.109:8098/Instant_Help/rest/hello/sendflag";
    // console.log("Hiiii");
    // console.log(url);
    // this.http.get(url).subscribe(data=>{
    //     this.result = data;
    //     console.log(this.result);
    //     if(this.result == 1)
    //     {
    //       console.log("Inside If");
    //       this.AcceptRequestCart();
    //     }
    //     else if(this.result == 0)
    //     {
    //       console.log("Inside Else");
    //       this.AcceptRequest();
    //     }
    //     else
    //     {
    //       console.log("Not received any order yet");
    //     }
    // });
  //}


  //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Timepass end %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
 
  
//-----------------------------------------------------------------------

//************************** Only Maps ************************************************/
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
    this.addMarker(); 
    
    }, (err) => {
      console.log(err);
    });
    
    }
    startNavigating(){

      let directionsService = new google.maps.DirectionsService;
      let directionsDisplay = new google.maps.DirectionsRenderer;
    
      directionsDisplay.setMap(this.map); 
     
      directionsService.route({
        origin: {lat: parseFloat(this.srcLat), lng: parseFloat(this.srcLong)},
        destination: {lat: parseFloat(this.destLat), lng: parseFloat(this.destLong)},
          travelMode: google.maps.TravelMode['DRIVING']
      }, (res, status) => {
    
          if(status == google.maps.DirectionsStatus.OK){
              directionsDisplay.setDirections(res);
              //this.infowindow.setContent(res[0].formatted_address);
              //infowindow.open(this.map, marker);
          } else {
              console.warn(status);
          }
    
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
  ShowDirections()
  {
    this.urlString = "https://www.google.com/maps/dir/?api=1&origin="+this.srcLat+","+this.srcLong+"&destination="
    +this.destLat+","+this.destLong;

    console.log(this.urlString);
  }
}
