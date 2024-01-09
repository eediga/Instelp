//import { GeoLocationPage } from './../geo-location/geo-location';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { HelloIonicPage } from './../hello-ionic/hello-ionic';
import { Observable } from 'rxjs/Observable';
import { HttpClient} from '@angular/common/http';
//import { Uploadpage } from './../uploadpage/uploadpage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { GeoLocationPage } from '../geo-location/geo-location';


import * as firebase from 'firebase';
import { snapshotToArray } from './../../app/environment';
import { UploadPage } from '../upload/upload';

@IonicPage()
@Component({
  selector: 'page-driver-register',
  templateUrl: 'driver-register.html',
})
export class DriverRegisterPage {
  user ={
    username:'',
    password: '',
    emailid: '',
    phoneNumber : '',
    ConfirmPassword:'',
    document:''
  }
  accept_terms ;
  data : Observable<any>;
  result: any=[];
  base64Image:string;
  filename:string;
  items = [];
  ref = firebase.database().ref('items/');
  inputText:string ='';
  inputDescription : string ='';

  constructor(public navCtrl: NavController, public navParams: NavParams,private http: HttpClient,private camera: Camera) {
    this.ref.on('value',resp =>{
      this.items = snapshotToArray(resp);
    })
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
    }, (err) => {
      console.log("error");
    });
  }
  addItem(item)
  {
    if(item!= undefined && item!=null)
    {
      let newItem = this.ref.push();
      newItem.set(item);
      this.user.username = '';
      this.user.emailid='';
      this.user.password='';
      this.user.phoneNumber;
    }
    this.navCtrl.push(GeoLocationPage);

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

  RegisterForm()
  {

    console.log(this.user);
    // if(this.user.password==this.user.ConfirmPassword)
    // {
    //   console.log(this.user.username);
    //   var url = "http://192.168.0.31:8098/Instant_Help/rest/hellodriver/driverregister";
    //   url = url+"?username="+this.user.username+"&password="+this.user.password+"&emailid="+this.user.emailid;
    //     this.http.get(url).subscribe(data=>{
    //     this.result = data;
    //     console.log(this.result);
    //   });
    // }
    // else{
    //     console.log("error"); 
    // }



     //this.navCtrl.push(HelloIonicPage)
    // ******* above stmt was not comment before upload page.

    //    var url = "http://192.168.43.210:8105/Instant/rest/hello";
    // //   console.log(this.user)


    //   let postData =(this.user); 
    //   let result = JSON.stringify({'username': this.user.username,'password':this.user.password,'emailid':this.user.emailid}); 

    //   //,{headers: new HttpHeaders().set('Content-Type', 'application/json'),}
    //   this.http.post(url,this.user).subscribe(data => 
    //     {
    //       console.log(data);
    //       this.result = data;
    //         this.navCtrl.push(HomePage);
    //     },error=>{
    //       console.log(error);
    //   });

  }
  UploadDoc()
  {
    this.navCtrl.push(UploadPage);
  }



}

