import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import {Geolocation} from '@ionic-native/geolocation';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DriverRegisterPage } from '../pages/driver-register/driver-register';
//import { UploadpagePage } from './../pages/uploadpage/uploadpage';
import { updateDate } from 'ionic-angular/umd/util/datetime-util';
import { GeoLocationPage } from '../pages/geo-location/geo-location';
import { UploadPage } from '../pages/upload/upload';
import {HttpClientModule} from '@angular/common/http';
import { AcceptRequestPage } from '../pages/accept-request/accept-request';
import { RoutePage } from '../pages/route/route';
import { DisplayInfoProvider } from '../providers/display-info/display-info';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatCardModule} from '@angular/material';
import { StartPage } from '../pages/start/start';
import { HTTP } from '@ionic-native/http';
import { AfterRequestPage } from '../pages/after-request/after-request';
import { ForgottenRoutePage } from '../pages/forgotten-route/forgotten-route';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RoutePage,
    DriverRegisterPage,
    UploadPage,
    GeoLocationPage,
    AcceptRequestPage,
    StartPage,
    AfterRequestPage,
    ForgottenRoutePage
    
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    BrowserAnimationsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
   
    DriverRegisterPage,
    UploadPage,
    RoutePage,
    GeoLocationPage,
    AcceptRequestPage,
    StartPage,
    AfterRequestPage,
    ForgottenRoutePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    DisplayInfoProvider,
    HTTP
  ]
})
export class AppModule {}
