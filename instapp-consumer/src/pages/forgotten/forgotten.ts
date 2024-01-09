import { HTTP } from '@ionic-native/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient} from '@angular/common/http';
import { ActionSheetController } from 'ionic-angular'
import {ModalController,ViewController} from 'ionic-angular';
import 'rxjs/add/operator/map';
@IonicPage()
@Component({
  selector: 'page-forgotten',
  templateUrl: 'forgotten.html',
})
export class ForgottenPage {
  parcel ={
    typeOfProduct:'',
    sizeOfProduct: '',
    weightOfProduct: '',
    srcAddr:'',
    destAddr :''   
  }
  obj : any;
  output: JSON;
  srcAdress  = {
    name : '',
    lat : '',
    long : ''
  };
  destAdress = {
    name : '',
    lat : '',
    long : ''
  };
  product = "mobile";
  srcLatitude :any;
//   obj: any = {"product":
// [
// {typeOfProduct: "value1", sizeOfProduct: "value2"}
// ]
// };
  result : JSON;
  data : Observable<any>;
  accept_terms ;
  flag=false;
  flag1=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private http: HttpClient,
    public actionSheetCtrl: ActionSheetController,public modalCtrl:ModalController,private httpMobile: HTTP) {
  }

  async ForgottenForm()
  {

    this.obj = {"product":
    [
      {typeOfProduct:this.parcel.typeOfProduct,sizeOfProduct:this.parcel.sizeOfProduct,weightOfProduct:this.parcel.weightOfProduct,
         srcAddr : this.srcAdress.name,srcLat:this.srcAdress.lat,srcLong:this.srcAdress.long, 
         destAddr:this.destAdress.name,destLat:this.destAdress.lat,destLong:this.destAdress.long},
    ]
    }

    
    // var url = "http://192.168.43.120:8098/Instant_Help/rest/hello/forgotten";
    // //this.obj =[this.parcel];
    // console.log(this.obj);
    // this.output = <JSON>this.obj;
    // this.data = this.http.post(url,this.output);
    // this.data.subscribe(data => {
    //     console.log(data);
    //     this.result = data as JSON;
    //     console.log(this.result);
    // },error=>{
    //     console.log(error);
    // })

    //********************** For Mobile ******************** */
          var url = "http://192.168.0.109:8098/Instant_Help/rest/hello/forgotten";
          this.output = <JSON>this.obj;
          console.log(this.output);
          this.httpMobile.setDataSerializer('json');
          this.httpMobile.post(url,this.output,{ }).then(data1 => {
              this.result = data1.data;
              console.log(this.result);
          })
          .catch(error => {
        
            console.log(error.status);
            console.log(error.error); // error message as string
            console.log(error.headers);
        
          });
    //-------------------END----------------------------------------

          // ******************* POST start for website********************************
          //   console.log(this.parcel);
          //   //this.output = [this.parcel];
          //  // console.log(this.output);
          //   var url = "http://192.168.0.109:8098/Instant_Help/rest/hello/forgotten";
          
          //   this.output = <JSON>this.obj;
          //   console.log(this.output);
          //   this.data = await this.http.post(url,this.output).map(res => res as JSON);
            
          //   this.data.subscribe(data => {
          //       console.log(data);
          //       this.result = data;
          //       console.log(this.result);
          //   },error=>{
          //       console.log(error);
          //   })
          //end

  
  }

  SourceAdress()
  {
    const myModal = this.modalCtrl.create('GetLocationMapPage');
    myModal.present();

    myModal.onDidDismiss((data)=>
    {
      this.srcAdress.name = data.name;
      this.srcAdress.lat = data.lat;
      this.srcAdress.long = data.long;
      console.log(this.srcAdress);
    })
    this.flag = true;
  }
  destinationAddress()
  {
    const myModal = this.modalCtrl.create('GetLocationMapPage');
    myModal.present();

    myModal.onDidDismiss((data)=>
    {
      this.destAdress.name = data.name;
      this.destAdress.lat = data.lat;
      this.destAdress.long = data.long;
      console.log(this.destAdress);
    })
    this.flag1 = true;
  }
}


