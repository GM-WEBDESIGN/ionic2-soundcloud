import { Component, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/Operator/map';

import { Soundcloud } from '../../providers/soundcloud';

@Component({
  selector: 'playlist',
  templateUrl: 'playlist.html'
})
export class PlaylistComponent {

  text: string;
  tracks = [];
  size: any;

  constructor(
    private el: ElementRef,
    private http: Http,
    private soundcloud: Soundcloud
  ) {
    console.log('Hello Playlist Component');
    this.text = 'Hello World';
    // for (var i = 0; i < 25; i++) {
    //   this.tracks.push({
    //     id: i,
    //     title: 'Titre ' + i,
    //     track: 'track-' + i,
    //     thumbnail: 'http://placehold.it/150x150'
    //   });
    // }
    // this.getTracks();
    setTimeout(() => {
      this.get();
      this.tracks = this.soundcloud.getTracks();
    }, 200);
  }

  getTracks() {
    this.http.get('https://api.soundcloud.com/tracks?client_id=0a6304ca71e84424d8e8e5e0947af8c5')
    .map(res => res.json())
    .subscribe(
      (response) => {
        console.log('Success ', response);
        this.tracks = response;
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }

  get() {
    this.soundcloud.fetchTrack(600, 'house');
    setTimeout(() => {
      this.tracks = this.soundcloud.getTracks();
      // console.log(this.tracks)
    }, 200)
  }

  stop() {
    this.soundcloud.stopStreaming();
  }
  play() {
    this.soundcloud.play();
  }
  next() {
    this.soundcloud.next();
  }

}
