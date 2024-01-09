import { LiveTrackPage } from './../live-track/live-track';
import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { NavController, NavParams, Menu } from 'ionic-angular';
import { GlobalCartProvider } from "../../providers/global-cart/global-cart";
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Geolocation } from '@ionic-native/geolocation';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-cart-details',
  templateUrl: 'cart-details.html',
})
export class CartDetailsPage {
  sum =0;
  finalTotal = 0;
  origin1 = {lat:0.0,lng:0.0} ;
  result : any;
  output1:JSON;
  data : Observable<any>;
  obj: any = {"cart":
    this.global.cart
  // [
  // {"placeName": "value1", "productName": "value2"},
  // {"placeName": "value4", "productName": "value5"}, 
  // {"placeName": "value7", "productName": "value8"} 
  // ]
    };

  constructor(public navCtrl: NavController, public navParams: NavParams,public global : GlobalCartProvider,
    private http: HttpClient,private geolocation : Geolocation) {
      this.output1 = this.navParams.get('output1');
      console.log(this.output1);
      // this.geolocation.getCurrentPosition().then((resp) => {  
      //   this.origin1 = {lat: resp.coords.latitude,lng:resp.coords.longitude};
      //  }).catch((error) => {
      //    console.log('Error getting location', error);
      //  });
  }
  ionViewDidLoad() {
    //this.t.tabBadge = this.global.cart.length;
    
    for(var i=0;i<this.global.cart.length;i++)
    {
      for(var j=0;j<this.global.cart[i].menu.length;j++)
      {
        this.sum = this.sum + (this.global.cart[i].menu[j].productPrice * this.global.cart[i].menu[j].quantity) ; 
      }
      
    }
    console.log(this.sum);
    this.finalTotal = this.sum + 40;
  }
  LiveTrack()
  {
    this.navCtrl.push(LiveTrackPage);
  }

  incr(item,menu)
  {
    console.log(item);
    console.log(menu);
    for(var i=0;i<this.global.cart.length;i++)
    {
      if(this.global.cart[i].placeName == item.placeName)
      {
        for(var j=0;j<this.global.cart[i].menu.length;j++)
        {
          if(this.global.cart[i].menu[j].productName == menu.productName)
          {
            this.sum = this.sum - (this.global.cart[i].menu[j].quantity * this.global.cart[i].menu[j].productPrice);
            this.global.cart[i].menu[j].quantity =this.global.cart[i].menu[j].quantity+1; 
            this.sum = this.sum  + (this.global.cart[i].menu[j].quantity * this.global.cart[i].menu[j].productPrice);
            this.finalTotal = this.sum + 40;
          }
        }
      }
    }
    
  }
  decrement(item,menu)
  {
    console.log(item);
    console.log(menu);

      for(var i=0;i<this.global.cart.length;i++)
      {
        if(this.global.cart[i].placeName == item.placeName)
        {
          for(var j=0;j<this.global.cart[i].menu.length;j++)
          {
              if(this.global.cart[i].menu[j].productName == menu.productName)
              {
                if(menu.quantity>1)
                {
                  this.sum = this.sum - (this.global.cart[i].menu[j].quantity * this.global.cart[i].menu[j].productPrice);
                  this.global.cart[i].menu[j].quantity =this.global.cart[i].menu[j].quantity-1;          
                  this.sum = this.sum  + (this.global.cart[i].menu[j].quantity * this.global.cart[i].menu[j].productPrice);
                  this.finalTotal = this.sum + 40;
                }

                else{
                  this.global.cart[i].menu.splice(j,1);
                }
              }
          }
        }
      }

  }


}
