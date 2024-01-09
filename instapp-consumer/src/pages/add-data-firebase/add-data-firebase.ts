import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { snapshotToArray } from './../../app/environment';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-add-data-firebase',
  templateUrl: 'add-data-firebase.html',
})
export class AddDataFirebasePage {

  items = [];
  restaurant ={
    name:'',
    lattitude: '',
    longitude: '',
    location:'',
    rating:'',

  }
  category: '';
  accept_terms ;
  data : Observable<any>;
  result: any=[];
  base64Image:string;
ref;


  constructor(public navCtrl: NavController, public navParams: NavParams,private camera: Camera) {


  }

  openCamera()
  {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.base64Image = 'data:image/jpeg;base64,' + imageData;
     console.log(this.base64Image);
     //this.restaurant.photo = this.base64Image;
    }, (err) => {
      console.log("error");
    });
  }

  openGallary()
  {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.base64Image = 'data:image/jpeg;base64,' + imageData;
     console.log(this.base64Image);
     //this.restaurant.photo = this.base64Image;
    }, (err) => {
      console.log("error");
    });

  }

  addItem(item)
  {
    console.log(this.category);
    this.ref = firebase.database().ref(this.category+"/");
    this.ref.on('value',resp =>{
      this.items = snapshotToArray(resp);

    });

    if(item!= undefined && item!=null)
    {
      //let newItem = this.ref.push();
      this.ref.child(this.restaurant.name).set(item);
      //newItem.set(item);
      this.category = '';
      this.restaurant.name = '';
      this.restaurant.lattitude='';
      this.restaurant.longitude='';
      this.restaurant.location='';
      this.restaurant.rating='';
      this.base64Image='';
    }

  }

  RegisterForm()
  {

  }

}
