import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewChild,trigger, transition, style, state, animate, keyframes } from '@angular/core';
import { Slides } from 'ionic-angular';
import { HomePage } from '../home/home';


/**
 * Generated class for the StartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
  animations: [
    
    trigger('bounce', [
          state('*', style({
              transform: 'translateX(0)'
          })),
          transition('* => rightSwipe', animate('700ms ease-out', keyframes([
            style({transform: 'translateX(0)', offset: 0}),
            style({transform: 'translateX(-65px)',  offset: 0.3}),
            style({transform: 'translateX(0)',     offset: 1.0})
          ]))),
          transition('* => leftSwipe', animate('700ms ease-out', keyframes([
            style({transform: 'translateX(0)', offset: 0}),
            style({transform: 'translateX(65px)',  offset: 0.3}),
            style({transform: 'translateX(0)',     offset: 1.0})
          ])))
      ])
    ]
})
export class StartPage {
  @ViewChild(Slides) slides: Slides;
  skipMsg: string = "Skip";
  state: string = 'x';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  slideMoved() {
    if (this.slides.getActiveIndex() >= this.slides.getPreviousIndex()) 
      this.state = 'rightSwipe';
    else 
      this.state = 'leftSwipe';
  }

  animationDone() {
    this.state = 'x';
  }
  skip() {
    this.navCtrl.push(HomePage);
  }
  slideChanged() {
    if (this.slides.isEnd())
      this.skipMsg = "Alright, I got it";
  }

}
