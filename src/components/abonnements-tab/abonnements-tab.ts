import { Component } from '@angular/core';

/*
  Generated class for the AbonnementsTab component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'abonnements-tab',
  templateUrl: 'abonnements-tab.html'
})
export class AbonnementsTabComponent {

  text: string;

  constructor() {
    console.log('Hello AbonnementsTab Component');
    this.text = 'Hello World';
  }

}
