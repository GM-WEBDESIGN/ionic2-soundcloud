import { Component } from '@angular/core';

/*
  Generated class for the AbonnesTab component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'abonnes-tab',
  templateUrl: 'abonnes-tab.html'
})
export class AbonnesTabComponent {

  text: string;

  constructor() {
    console.log('Hello AbonnesTab Component');
    this.text = 'Hello World';
  }

}
