import { Component } from '@angular/core';

/*
  Generated class for the TitresTab component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'titres-tab',
  templateUrl: 'titres-tab.html'
})
export class TitresTabComponent {

  text: string;

  constructor() {
    console.log('Hello TitresTab Component');
    this.text = 'Hello World';
  }

}
