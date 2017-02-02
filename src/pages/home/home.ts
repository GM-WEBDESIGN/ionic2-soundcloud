import { Component, ViewChild, ElementRef } from '@angular/core';

// import { NavController } from 'ionic-angular';
import { PlaylistPage, SearchPage, HeartPage, MenuPage } from '../index';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  playlist: any;
  search: any;
  heart: any;
  menu: any;

  @ViewChild('player') player : ElementRef;

  constructor(
    private el: ElementRef
  ) {
    this.playlist = PlaylistPage;
    this.search = SearchPage;
    this.heart = HeartPage;
    this.menu = MenuPage;
  }

  ionViewDidLoad() {
    let player = this.player['el'].nativeElement;
    this.el.nativeElement.children[0].style.height = this.el.nativeElement.children[0].offsetHeight - 62 + "px";
    console.log(this.el)
  }


}
