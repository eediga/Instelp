
import { HomePage } from '../pages/home/home';
import {StartPage} from '../pages/start/start';
import { Component, ViewChild } from '@angular/core';
import { timer } from 'rxjs/observable/timer';
import { Platform, MenuController, Nav } from 'ionic-angular';


//import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import * as firebase from 'firebase';
import { FIREBASE_CONFIG } from './environment';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = StartPage;
  showSplash = true;
  pages: Array<{title: string, component: any}>;
  
  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  
    ) {


      firebase.initializeApp(FIREBASE_CONFIG);
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Hello Ionic', component: HomePage }
      //{ title: 'My First List', component: ListPage }
    ];

//OneSignal Push Notification
    // platform.ready().then(() => {
    //   statusBar.styleDefault();
    //   splashScreen.hide();
  
    //   // OneSignal Code start:
    //   // Enable to debug issues:
    //   // window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
  
    //   var notificationOpenedCallback = function(jsonData) {
    //     alert('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    //   };
  
    //   window["plugins"].OneSignal
    //     .startInit("9d5a2d45-b8b5-47d6-acc9-50c2611ce73e", "872807471814")
    //     .handleNotificationOpened(notificationOpenedCallback)
    //     .endInit();
    // });


    
//OneSignal Push Notification
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      timer(3000).subscribe(()=>this.showSplash = false);
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
  
}


