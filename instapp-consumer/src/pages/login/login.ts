import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from './../tabs/tabs';
import {RegisterPage} from '../register/register';
import {SignUpPage} from '../sign-up/sign-up';
//import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { HTTP } from '@ionic-native/http';
import { Observable } from 'rxjs/Observable';
import { VariableAst, identifierModuleUrl } from '@angular/compiler';
import { ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {
    username :'',
    password : '',
    Latitude : '',
    Longitude: ''
  };
  status = false;
  result: any;
  userdata:string;
  data : Observable<any>;
  id :any = 101;
  Latitude : number;
  Longitude : number;


  constructor(public navCtrl: NavController,
    private http: HttpClient,public toastCtrl: ToastController,private geolocation : Geolocation,private httpMobile: HTTP) {
    this.geolocation.getCurrentPosition().then((resp) => {
    this.user.Latitude = resp.coords.latitude.toString();
    this.user.Longitude = resp.coords.longitude.toString();
   }).catch((error) => {
             console.log('Error getting location', error);
      });;
 }
 Navigate()
 {
   this.navCtrl.push(SignUpPage)
 }
 presentToast() {
   const toast = this.toastCtrl.create({
     message: 'Logged in successfully',
     duration: 3000
   });
   toast.present();
 }

  // after login button is clicked using get method
  getMethod()
  {
    // ******************* For Mobile **************************************
    //this.navCtrl.push(TabsPage);
    //  console.log("insid get method");
    //  console.log(this.user.Latitude, this.user.Longitude);
    //  var url = "http://192.168.0.109:8098/Instant_Help/rest/hello/login";
    // // this.geolocation.getCurrentPosition().then((resp) => {
    // // this.user.Latitude = resp.coords.latitude.toString();
    // // this.user.Longitude = resp.coords.longitude.toString();

     
    //   this.httpMobile.get(url,{
    //     username : this.user.username,
    //     password : this.user.password,
    //     Latitude : this.user.Latitude,
    //     Longitude : this.user.Longitude
    //   }, {'Content-Type': 'application/json'}
    //   ).then(data1 => {
    //     if(data1.data == 1 )
    //     {
    //       this.presentToast();
    //       this.navCtrl.push(TabsPage);
    //     }
    //     else if(data1.data == 99){
    //       this.status = true;
    //       console.log("error while logging");
    //     }
    //   })
    //   .catch(error => {
    
    //     console.log(error.status);
    //     console.log(error.error); // error message as string
    //     console.log(error.headers);
    
    //   });

   
  
   
 // ************uncomment for website view working properly  
   console.log("insid get method");
  this.navCtrl.push(TabsPage);
  //   this.geolocation.getCurrentPosition().then((resp) => {
  //   this.Latitude = resp.coords.latitude;
  //   this.Longitude = resp.coords.longitude;
  //   console.log(this.Latitude+" "+this.Longitude);
  //   var url = "http://192.168.0.108:8098/Instant_Help/rest/hello/login";
  //   url = url+"?username="+this.user.username+"&password="+this.user.password+"&Latitude="+this.Latitude+"&Longitude="+this.Longitude;
    
  //   console.log(url);
  //   this.http.get(url).subscribe(data=>{
  //     this.result = data;
  //     console.log(this.result);

  //     if(this.result == 1 )
  //     {
  //       this.presentToast();
  //       this.navCtrl.push(TabsPage);
  //     }
  //     else if(this.result == 99){
  //       this.status = true;
  //       console.log("error while logging");
  //     }
  //   });
  // }).catch((error) => {
  //   console.log('Error getting location', error);
  // });
    }
}
