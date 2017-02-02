import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'infos-tab',
  templateUrl: 'infos-tab.html'
})
export class InfosTabComponent {

  text: string;

  constructor(private af: AngularFire) {
    console.log('Hello InfosTab Component');
    this.text = 'Hello World';
  }

  logout() {
    this.af.auth.logout();
  }

}
