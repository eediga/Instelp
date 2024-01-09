import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Observable } from 'rxjs/Observable';
import { HttpClient} from '@angular/common/http';

/**
 * Generated class for the UploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {

  result: any;
  data : Observable<any>;
  base64Image:string;
  filename : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera,private http: HttpClient) {
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
    }, (err) => {
      console.log("error");
    });
  }

  PostData()
  {
    console.log(this.base64Image);
    var url = "http://192.168.0.105:8098/Instant_Help/rest/hellodriver/driverDoc";
    url = url+"?file="+this.base64Image;
    this.http.get(url).subscribe(data=>{
      this.result = data;
      console.log(this.result);
    });
  }
}
