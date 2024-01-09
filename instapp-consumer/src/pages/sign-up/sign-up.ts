import { HTTP } from '@ionic-native/http';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController, NavParams,IonicPage } from 'ionic-angular';
import {FormControl, Validators} from '@angular/forms';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  user ={
    username:'',
    password: '',
    emailid: '',
    ConfirmPassword:'',
    contactNo: ''
  }
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  result: any=[];


  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  constructor(public navCtrl: NavController, public navParams: NavParams,private http : HttpClient,
    private httpMobile:HTTP) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }
  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
  RegisterForm()
    {
      console.log(this.user);
  // ************************************ For Mobile **************************************
      // if(this.user.password==this.user.ConfirmPassword)
      // {
      //  console.log("insid get method");
      //  var url = "http://192.168.0.109:8098/Instant_Help/rest/hello/register";
      
      //   this.httpMobile.get(url,{
      //     username : this.user.username,
      //     password : this.user.password,
      //     emailid : this.user.emailid,
      //     //contactNo : this.user.contactNo
      //   }, {'Content-Type': 'application/json'}
      //   ).then(data1 => {
      //     this.navCtrl.push(LoginPage);
      //   })
      //   .catch(error => {
      //     console.log(error.status);
      //     console.log(error.error); // error message as string
      //     console.log(error.headers);
      //   });

      // }
      // else
      // {
      //   console.log("error"); 
      // }

  //**********************************************For website******************************************* */
      if(this.user.password==this.user.ConfirmPassword)
      {
        console.log(this.user.username);
        var url = "http://192.168.0.109:8098/Instant_Help/rest/hello/register";
        url = url+"?username="+this.user.username+"&password="+this.user.password+"&emailid="+this.user.emailid;
          this.http.get(url).subscribe(data=>{
          this.result = data;
          console.log(this.result);
          this.navCtrl.push(LoginPage);
        });
      }else{
        console.log("error"); 
      }
      
    }
}
