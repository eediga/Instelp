import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient} from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user ={
    username:'',
    password: '',
    emailid: '',
    ConfirmPassword:''
  }
  accept_terms ;
  data : Observable<any>;
  result: any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private http: HttpClient)
  {

  }

  RegisterForm()
  {

    if(this.user.password==this.user.ConfirmPassword)
    {
      console.log(this.user.username);
      var url = "http://192.168.0.109:8098/Instant_Help/rest/hello/register";
      url = url+"?username="+this.user.username+"&password="+this.user.password+"&emailid="+this.user.emailid;
        this.http.get(url).subscribe(data=>{
        this.result = data;
        console.log(this.result);
      });
    }else{
      console.log("error"); 
    }


     this.navCtrl.push(LoginPage);
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
}
