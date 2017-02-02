import { Component, Input } from '@angular/core';
import { Soundcloud } from '../../providers/soundcloud';

@Component({
  selector: 'track',
  templateUrl: 'track.html'
})
export class TrackComponent {

  @Input('track') track;

  imageDefault: string = 'https://i1.sndcdn.com/avatars-000071208256-dzuduk-t200x200.jpg';

  text: string;

  constructor(
    private soundCloud: Soundcloud
  ) {
    // console.log('Hello Track Component');
    this.text = 'Hello World';
  }

  selected(track) {
    this.soundCloud.playThis(track);
    // console.log('Track selected', track)
  }

  checkArtwork(artwork) {
    if (artwork !== null) {
      return artwork;
    } else {
      return 'https://placeholdit.imgix.net/~text?txtsize=33&txt=No%20Thumbnail&w=350&h=350';
    }
  }  
  
  formatTime(time) {
    let minutes = Math.floor(time / 60000);
    let stringMinutes = (minutes >= 10) ? minutes : "0" + minutes;
    let seconds = Math.floor((time % 60000) / 1000);
    let stringSeconds = (seconds >= 10) ? seconds : "0" + seconds;
    return minutes + ':' + stringSeconds;
  }

}
