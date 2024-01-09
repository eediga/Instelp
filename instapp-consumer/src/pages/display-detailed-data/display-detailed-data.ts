import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Menu } from 'ionic-angular';
import * as firebase from 'firebase';
import { snapshotToArray } from './../../app/environment';
import { GlobalCartProvider } from "../../providers/global-cart/global-cart";

declare var google;

@Component({
  selector: 'page-display-detailed-data',
  templateUrl: 'display-detailed-data.html',
})
export class DisplayDetailedDataPage {

  category;
  cat;
  items = [];
  
 product = {
  placeName:'',
  productName:'',
  productPrice: 0,
  placeLat:'',
  placeLong:'',
  placeLocation:'',
  quantity : 0
 }; 
 

  ref;
  place;
  //buttonName:any = 'Add +';
  flag = false;
 quantity =0;
   check = 0 ;
   checkSamePlaceName  = -1;
  constructor(public navCtrl: NavController,public navParams: NavParams,private g : GlobalCartProvider) {
    
    this.category = this.navParams.get('itemName');
    this.place = this.navParams.get('itemPlace');
    this.cat = this.navParams.get('itemCategory');
    console.log(this.cat);
    this.product.placeName = '';
    this.product.productName = '';
    this.product.productPrice = 0;
    this.product.placeLat = '';
    this.product.placeLong = '';    
    this.product.placeLocation = '';
    this.product.quantity = 0;
    
    this.ref = firebase.database().ref(this.cat+'/'+this.category+'/Menu');
    // this.ref = firebase.database().ref(this.category+'/');
   // console.log(this.category);
    this.ref.on('value',resp =>{

      this.items = snapshotToArray(resp);  
      console.log(this.items);
      for(var i=0;i<this.items.length;i++)
      {
        this.items[i].quant =0;
      }
    }
   );

   console.log(this.items);
  }
  incre(num)
  {
    num.quant =  num.quant+1;
  }
  decre(num)
  {
    if(num.quant > 0)
    {
      num.quant =  num.quant- 1;
    }
  }
  RemoveFromCart(item)
  {
    if(this.product.quantity > 1)
    {
      this.product.quantity = this.product.quantity - 1;
    }
    else{
      var index = this.g.cart.indexOf(item);
      this.g.cart.splice(index,1);
      //this.buttonName = ' Add + ';
      this.flag = false;
      this.product.quantity = 0;
    }
    console.log(this.g.cart);
  }
  addTocart(item)
  {
    item.quant = item.quant+1;

  //   console.log(item);
  //   for(var i=0;i<this.g.cart.length;i++)
  //   {
  //     if(this.g.cart[i].productName == item.key && this.g.cart[i].placeName == this.place.key)
  //     {

  //       this.g.cart[i].quantity =this.g.cart[i].quantity+1; 
  //       this.check = 1;
  //       this.buttonName = ' + ';
  //       this.flag = true;
  //       break;
  //     }
  //     else{
  //       this.check = 0;
  //     }
  // }
  // if(this.check == 0)
  // {
  //   this.g.cart.push({placeName : this.place.key,productName:item.key,productPrice:item.value,placeLat:this.place.value.lattitude
  //     ,placeLong:this.place.value.longitude,placeLocation : this.place.value.location,quantity : 1});
  // }
    
  // console.log(this.g.cart);

    console.log(item);
    for(var i=0;i<this.g.cart.length;i++)
    {
      if(this.g.cart[i].placeName == this.place.key)
      {
        this.checkSamePlaceName = i;
        for(var j=0;j<this.g.cart[i].menu.length;j++)
        {
          if(this.g.cart[i].menu[j].productName == item.key)
          {
            this.g.cart[i].menu[j].quantity =this.g.cart[i].menu[j].quantity+1; 
            this.check = 1;
            //this.buttonName = ' + ';
            this.flag = true;
            break;
          }
          else
          {
            this.check = 0;
          }
        }
      }
    }
    if(this.checkSamePlaceName == -1)
    {
      // item.quant = item.quant +1;
        this.g.cart.push({placeName : this.place.key,
          menu:[{productName:item.key,productPrice:item.value,quantity : item.quant}],placeLat:this.place.value.lattitude
      ,placeLong:this.place.value.longitude,placeLocation : this.place.value.location});
    }
    else
    {
      console.log("wait");

      if(this.check ==0){
        // item.quant = item.quant+1;
        this.g.cart[this.checkSamePlaceName].menu.push({productName:item.key,productPrice:item.value,quantity : item.quant});
      }
    }

    console.log(this.g.cart);
 }
}
