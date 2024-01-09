import { DisplayDetailedDataPage } from './../display-detailed-data/display-detailed-data';
import { ForgottenPage } from './../forgotten/forgotten';
import { ContactPage } from './../contact/contact';
import { DisplayCategoryPage } from './../display-category/display-category';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalCartProvider } from "../../providers/global-cart/global-cart";
import * as firebase from 'firebase';
import { snapshotToArray } from './../../app/environment';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public countryList:Array<any>;
  public loadedCountryList:Array<any>;
  public countryRef:firebase.database.Reference;
  slideOpts = {
    effect: 'flip'
  };
  flag = false;
  panelOpenState = false;
  ref;
  datas: any =[];
  all_items = [];
  item_restuarant=[];
  item_groceery=[];
  item_medicine=[];
  category: string;
  restaurant:string;
  medicine : string;
  grocery: string;
  stationary : string;
  //cart=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public global: GlobalCartProvider) {
    
    //search bar
    this.countryRef = firebase.database().ref('/restaurant');

    this.countryRef.on('value', countryList => {
      let countries = [];
      countryList.forEach( country => {
        countries.push(country.val());
        return false;
      });

      this.countryList = countries;
      this.loadedCountryList = countries;
    });
    //search bar

    // this.ref = firebase.database().ref('restaurant/');
    // console.log(this.category);
    // this.ref.on('value',resp =>{
    //   this.item_restuarant = snapshotToArray(resp); 
    //   for(var i =0;i<this.item_restuarant.length;i++)
    //   {
    //     this.all_items.push(this.item_restuarant[i].key);
    //   } 
    //   console.log(this.item_restuarant);
    // });  
    // this.ref = firebase.database().ref('grocerry/');
    // console.log(this.category);
    // this.ref.on('value',resp =>{
    //   this.item_groceery = snapshotToArray(resp);  
    //   console.log(this.item_groceery);
    // });
    // this.ref = firebase.database().ref('medicine/');
    // console.log(this.category);
    // this.ref.on('value',resp =>{
    //   this.item_medicine = snapshotToArray(resp);  
    //   console.log(this.item_medicine);
    // });
  }
  initializeItems(){
    this.countryList = this.loadedCountryList;
  }

  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();
    
    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;

    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }

    this.countryList = this.countryList.filter((v) => {
      if(v.name && q) {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
    this.flag = true;
    console.log(q, this.countryList.length);

  }
  ionViewDidLoad()
  {
  }
  slides = [
    {
      image: "assets/imgs/med.png",
    },
    {
      image: "assets/imgs/forgotten.png",
    },
    {
      image: "assets/imgs/restaurant.png",
    }
  ];

  // ChosenCategory(category)
  // {
  //   this.navCtrl.push(DisplayCategoryPage,{
  //     category:category
  //   });
  // }
  //getItems(event)
  //{
    // var val = event.target.value;
    // if (val && val.trim() != '') {
    //   this.all_items = this.all_items.filter((item) => {
    //     return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
    //   })
    // }
    
  //}

  movetonext(category)
  {
    console.log(category);
    this.navCtrl.push(ContactPage,{
      category:category,
     
    });
  }
  gotoForgotten()
  {
    console.log("hii");
    this.navCtrl.push(ForgottenPage);
  }
  goDirectlyToMenuRestaurant()
  {
    //console.log(itemName.value.name);
    this.navCtrl.push(DisplayDetailedDataPage,{
      itemName:'Sheetal',
      itemPlace: 'Sheetal',
      itemCategory : 'restaurant'
    });
  }
}
