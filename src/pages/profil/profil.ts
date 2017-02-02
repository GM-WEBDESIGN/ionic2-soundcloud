import { Component, ElementRef } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import {
  InfosTabComponent,
  TitresTabComponent,
  AbonnementsTabComponent,
  AbonnesTabComponent
} from '../../components/index';

@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html'
})
export class ProfilPage {

  infos: any;
  titres: any;
  abonnements: any;
  abonnes: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private el: ElementRef) {
    this.infos = InfosTabComponent;
    this.titres = TitresTabComponent;
    this.abonnements = AbonnementsTabComponent;
    this.abonnes = AbonnesTabComponent;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
    // this.el.nativeElement.parentElement.parentElement.style.height = this.el.nativeElement.parentElement.parentElement.parentElement.clientHeight - 62 + "px";
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
