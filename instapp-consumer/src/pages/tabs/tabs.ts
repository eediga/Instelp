import { CartDetailsPage } from './../cart-details/cart-details';
import { CartPage } from './../cart/cart';
import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { GlobalCartProvider } from "../../providers/global-cart/global-cart";
import { Injectable } from '@angular/core';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
@Injectable()
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = CartPage;
  tab5Root = CartDetailsPage;
  public tabBadge;
  constructor(private g : GlobalCartProvider) {

  }
  ionViewDidLoad(){
    this.tabBadge = this.g.cart.length;
  }

}
