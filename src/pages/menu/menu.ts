import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { ProfilPage } from '../index';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  goProfil() {
    let modal = this.modalCtrl.create(ProfilPage);
    modal.present();
  }

}
