import { Device } from '@ionic-native/device';
import { SignUpPage } from './../pages/sign-up/sign-up';
import { LiveTrackPage } from './../pages/live-track/live-track';
import { HTTP } from '@ionic-native/http';
import { CartDetailsPage } from './../pages/cart-details/cart-details';
import { GetLocationMapPage } from './../pages/get-location-map/get-location-map';
import { ForgottenPage } from './../pages/forgotten/forgotten';

import { CartPage } from './../pages/cart/cart';
import { AddDataFirebasePage } from './../pages/add-data-firebase/add-data-firebase';
import { DisplayCategoryPage } from './../pages/display-category/display-category';
import { LoginPage } from './../pages/login/login';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RegisterPage } from '../pages/register/register';
import {HttpClientModule} from '@angular/common/http';
import { Camera } from '@ionic-native/camera';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {MatButtonModule, MatFormFieldModule,MatInputModule} from '@angular/material'
import {MatGridListModule} from '@angular/material/grid-list'
import {MatCardModule} from '@angular/material/card'
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import { DisplayDetailedDataPage } from '../pages/display-detailed-data/display-detailed-data';
import { GlobalCartProvider } from '../providers/global-cart/global-cart';
import {Geolocation} from '@ionic-native/geolocation';
import { StarRatingModule } from 'ionic3-star-rating';
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    DisplayCategoryPage,
    AddDataFirebasePage,
    CartPage,
    CartDetailsPage,
    DisplayDetailedDataPage,
    ForgottenPage,
    LiveTrackPage,
    SignUpPage
      ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatGridListModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    StarRatingModule,
    IonicModule.forRoot(MyApp)
  ],

  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    DisplayCategoryPage,
    AddDataFirebasePage,
    CartPage,
    CartDetailsPage,
    ForgottenPage,
    DisplayDetailedDataPage,
    LiveTrackPage,
    SignUpPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    HTTP,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalCartProvider,
    Device
  ]
})
export class AppModule {}
