import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { ToastController } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import { DriverRegisterPage } from '../driver-register/driver-register';
import { Geolocation } from '@ionic-native/geolocation';
import { HTTP } from '@ionic-native/http';
import { AcceptRequestPage } from '../accept-request/accept-request';
import { AfterRequestPage } from '../after-request/after-request';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user = {
    username :'',
    password : ''
  };
  status = false;
  result: any;
  userdata:string;
  id :any = 101;
  data : Observable<any>;
  Latitude ;
  Longitude ;
  
  constructor(public navCtrl: NavController,private http: HttpClient,public toastCtrl: ToastController
    ,public geolocation: Geolocation,private httpMobile: HTTP){
      this.geolocation.getCurrentPosition().then((resp) => {
        this.Latitude = resp.coords.latitude.toString();
        this.Longitude = resp.coords.longitude.toString();
          console.log(this.Latitude+" "+this.Longitude);
        }).catch((error) => {
          console.log('Error getting location', error);
        });
  }

 getMethod()
  {
   this.navCtrl.push(DriverRegisterPage);
    var url = "http://192.168.0.104:8098/Instant_Help/rest/hello/login";
    url = url+"?username="+this.user.username+"&password="+this.user.password;
    this.http.get(url).subscribe(data=>{
      this.result = data;
      console.log(this.result);

      if(this.result == 1 )
      {
        this.presentToast();
        this.navCtrl.push(AcceptRequestPage);
      }
      else if(this.result == 99){
        this.status = true;
        console.log("error while logging");
      }
    });
    
  }

  driverLogin()
  {  

//************************************** For Website ********************************* */

        // var url = "http://192.168.0.109:8098/Instant_Help/rest/hellodriver/driverlogin/website";
        // url = url+"?username="+this.user.username+"&password="+this.user.password+"&Latitude="+this.Latitude+"&Longitude="+this.Longitude;
        // console.log(url);
        // this.http.get(url).subscribe(data=>{
        //   this.result = data;
        //   console.log(this.result);
    
        //   if(this.result == 1 )
        //   {
        //     // this.presentToast();
        //     this.navCtrl.push(AcceptRequestPage,
        //       {
        //         lat : this.Latitude,
        //         long : this.Latitude
        //       });
        //   }
        //   else if(this.result == 99){
        //     this.status = true;
        //     // this.navCtrl.push(AcceptRequestPage,
        //     //   {
        //     //     lat : this.Latitude,
        //     //     long : this.Latitude
        //     //   });
        //     // console.log("error while logging");
        //   }
        // });
  
  //************************************************************************************************** */    
      //  this.navCtrl.push(AcceptRequestPage,
      //   {
      //     lat : this.Latitude,
      //     long : this.Latitude
      //   });
      //   this.navCtrl.push(AfterRequestPage);

        //*************************************************************** */

        this.navCtrl.push(AcceptRequestPage,
                {
                  lat : this.Latitude,
                  long : this.Latitude
                });

        //***************************************** For Mobile *************/
        
        // var url = "http://192.168.0.109:8098/Instant_Help/rest/hellodriver/driverlogin/mobile";
        // this.httpMobile.get(url,{username : 'Aditi',
        //       password : 'aditi123',
        //       Latitude : this.Latitude,
        //       Longitude : this.Longitude
        //     }, {'Content-Type': 'application/json'}
        //     ).then(data1 => {
        //   this.result = data1.data;
        //   console.log(this.result);
    
        //   if(this.result == 1 )
        //   {
        //     // this.presentToast();
        //     this.navCtrl.push(AcceptRequestPage,
        //       {
        //         lat : this.Latitude,
        //         long : this.Latitude
        //       });
        //   }
        //   else if(this.result == 99){
        //     this.status = true;
           
        //     console.log("error while logging");
        //   }
        //     })
        //       .catch(error => {
            
        //         console.log(error.status);
        //         console.log(error.error); // error message as string
        //         console.log(error.headers);
            
        //       });


        //----------------------------------------------------------------------------
  }
  presentToast()
  {
    const toast = this.toastCtrl.create(
      {
        message : 'Logged in Successfully',
        duration : 3000
      }
    );
    toast.present();
  }
}
