import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Track } from '../interfaces';

declare var SC;

@Injectable()
export class Soundcloud {

  private clientId: string = "0a6304ca71e84424d8e8e5e0947af8c5";
  private tracks: any[] = [];
  private playTrack: number = 0;
  public currentTrack: Track;
  private Player;

  observer: Observable<any>;
  thisTrack$: Subject<any>;
  observerPlay: Observable<any>;
  play$: Subject<any>;
  observerOpenPlayer: Observable<any>;
  openPlayer$: Subject<any>;
  observerCurrentTime: Observable<any>;
  currentTime$: Subject<any>;

  constructor(public http: Http, private platform: Platform) {
    this.currentTrack = {
      id: 0,
      title: 'Fetching tracks...',
      permalink_url: '',
      artwork_url: '',
      user: {
        permalink_url: '',
        username: ''
      }
    };

    this.platform.ready().then(() => {
      SC.initialize({
        client_id: this.clientId
      });
    });

    this.thisTrack$ = new Subject<any>();
    this.observer = this.thisTrack$.asObservable();
    this.play$ = new Subject<any>();
    this.observerPlay = this.play$.asObservable();
    this.openPlayer$ = new Subject<any>();
    this.observerOpenPlayer = this.openPlayer$.asObservable();
    this.currentTime$ = new Subject<any>();
    this.observerCurrentTime = this.currentTime$.asObservable();
  }

  fetchTrack(bpm: number, genre: string): void {
    SC.get('/tracks', {
      q: 'iconicaudio'
    }).then((tracks) => {
      // console.log(tracks);
      this.tracks = tracks;
      this.startStreaming();
    })
  }

  getTracks() {
    return this.tracks;
  }

  startStreaming() {
    this.currentTrack = this.tracks[this.playTrack];

    SC.stream('/tracks/' + this.currentTrack.id).then((player) => {
      this.Player = player;
      // player.play();

      this.thisTrack$.next(this.currentTrack);

      player.on('buffering_start', () => {
        console.log('buffering_start...')
      });

      player.on('buffering_end', () => {
        console.log('buffering_end')
      });

      player.on('finish', () => {
        if (this.playTrack < this.tracks.length - 1) {
          this.playTrack++;
        } else {
          this.playTrack = 0;
        }

        this.startStreaming();
      });
    });
  }

  playThis(track) {
    SC.stream('/tracks/' + track.id).then((player) => {
      this.Player = player;
      player.play();
      this.thisTrack$.next(track);
      this.play$.next('play');
      this.openPlayer$.next(true);
    });
  }

  next() {
    this.stopStreaming();
    if (this.playTrack < this.tracks.length - 1) {
      this.playTrack++;
    } else {
      this.playTrack = 0;
    }
    this.startStreaming();
  }

  play() {
    this.Player.play();
    this.play$.next('play');
    // this.Player.on('play-start', () => {
    //   this.play$.next('play-start');
    // });
    // this.Player.on('play-resume', () => {
    //   this.play$.next('play-resume');
    // });
  }

  currentTime() {
    return this.Player.currentTime();
  }

  pause() {
    this.Player.pause();
    this.play$.next('pause');
    // this.Player.on('play-start', () => {
    //   this.play$.next('play-start');
    // });
    // this.Player.on('play-resume', () => {
    //   this.play$.next('play-resume');
    // });
  }

  stopStreaming() {
    this.Player.pause();
    this.Player.seek(0);
  }

}
