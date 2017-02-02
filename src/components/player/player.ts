import { Component, ElementRef, HostListener, ViewChild, OnInit, OnChanges } from '@angular/core';
import { StatusBar } from 'ionic-native';

import { Soundcloud } from '../../providers/soundcloud';

@Component({
  selector: 'player',
  templateUrl: 'player.html',
  // host: {'(pan)': 'panEvent($event)'}
})
export class PlayerComponent implements OnInit, OnChanges {

  @ViewChild('gauge') gauge: ElementRef;
  @ViewChild('player') player: ElementRef;
  currentTrack: any = {
    artwork_url: '',
    title: '',
    user: {
      username: ''
    }
  };
  text: string;
  size: any;
  touch = {x:0,y:0,time:0};
  touchStart: number = null;
  touchStartTop : boolean = false;
  timeStampStart = undefined;
  timeStampEnd = undefined;
  yStart: number = 0;
  yEnd: number = 0;
  newH: number = 0;
  touchMove: boolean = false;
  isPlaying: boolean = false;

  @HostListener('touchstart', ['$event'])
  @HostListener('touchend', ['$event'])
  @HostListener('touchmove', ['$event'])
  @HostListener('touchcancel', ['$event'])
  touchEvent(e) {
    if (e.type === 'touchstart') {
      this.touchMove = false;
    }
    if (e.type === 'touchmove') {
      this.touchMove = true;
    }
    if (e.type === 'touchend') {
      if (!this.touchMove) {
        let playerElement = document.querySelector('#player');
        // console.log('click', e)
        if (e.srcElement.parentElement.parentElement.id === "minimize" || ((e.srcElement.id === "header-player" || e.srcElement.parentElement.id === "header-player" || e.srcElement.parentElement.parentElement.id === "header-player") && e.srcElement.id !== "play-pause-header" && !playerElement.parentElement.classList.contains('open'))) {  // (e.srcElement.id === "header-player" || e.srcElement.parentElement.id === "header-player" || e.srcElement.parentElement.parentElement.id === "header-player") && e.srcElement.id !== "play-pause-header"
          this.clickEvent(e)
        } else {
          if ((playerElement.parentElement.classList.contains('open') && !e.srcElement.classList.contains('artist')) && (playerElement.parentElement.classList.contains('open') && !e.srcElement.classList.contains('track'))) {
            this.playPause();
            if (e.srcElement.parentElement.parentElement.id === "play-pause-header") {
              this.playPause();
            }
          } else if (playerElement.parentElement.classList.contains('open') && e.srcElement.classList.contains('artist')) {
            this.showArtist(this.currentTrack.user);
          } else if (playerElement.parentElement.classList.contains('open') && e.srcElement.classList.contains('track')) {
            this.showTrack(this.currentTrack);
          }
        }
      } else {
        // console.log('move');
      }
    }
  }


  clickEvent(e) {
    console.log(e)
    let element = document.querySelector('#player').parentElement;
    element.classList.toggle('open');
    setTimeout(() => {
      if (element.classList.contains('open')) {
        StatusBar.styleLightContent();
        StatusBar.backgroundColorByHexString('#000000');
      } else {
        StatusBar.styleDefault()
        StatusBar.backgroundColorByHexString('#efefef');
      }
    })
  }

  /*
  handleTouch(e) {
    let content = document.querySelector('#player');
    let contentHeight = content.parentElement.parentElement.clientHeight;
    let elementHeight = content.parentElement.style.height;
    if (elementHeight === '') {
      content.parentElement.style.height = '62px';
    }
    let touch = e.touches[0] || e.changedTouches[0];
    // console.log(this.onElementHeightChange(content));

    if (e.type === 'touchstart') {
      this.timeStampStart = new Date().getTime();
      this.touch.x = touch.pageX;
      this.touch.y = touch.pageY;
      this.yStart = touch.pageY;
      this.touch.time = touch.timeStamp;
      // console.log(touch);
      this.touchStart = touch.pageY;
      if (elementHeight === contentHeight + "px") {
        this.touchStartTop = true;
      }
      content.parentElement.style.transition = "";
    } else if (e.type === 'touchmove') {
      if (touch.pageY > this.touchStart) {
        if (elementHeight !== "62px") {
          if (!this.touchStartTop) {
            content.parentElement.style.height = contentHeight - touch.pageY + "px";
          } else {
            // console.log('il faut bidouiller')
          }
          content.parentElement.style.transition = "";
        } else {
          // console.log('deja au min')
        }
      } else if (touch.pageY < this.touchStart) {
        if (contentHeight + "px" !== elementHeight) {
          content.parentElement.style.height = contentHeight - touch.pageY + "px";
          content.parentElement.style.transition = "";
        } else {
          // console.log('deja au max')
        }
      }
      this.touch.x = touch.pageX;
      this.touch.y = touch.pageY;
      this.touch.time = touch.timeStamp;
    } else if (e.type === 'touchend') {
      this.timeStampEnd = new Date().getTime();
      let diffTime = this.timeStampEnd - this.timeStampStart;
      let dx = touch.pageX - this.touch.x;
      this.yEnd = touch.pageY;
      let diffY = this.yStart - this.yEnd;
      if (diffTime < 200 && (diffY > 100 || diffY < -100)) {
        if (diffY > 100) {
          content.parentElement.style.height = contentHeight + "px";
        } else if (diffY < -100) {
          content.parentElement.style.height = "62px";
        }
      } else {
        if (touch.pageY > (contentHeight / 2) && diffY < 0) {
          content.parentElement.style.height = "62px";
          this.touchStartTop = false;
        } else if (touch.pageY < (contentHeight / 2)) {
          content.parentElement.style.height = contentHeight + "px";
          this.touchStartTop = true;
        }
      }
      let dt = touch.timeStamp - this.touch.time;
      content.parentElement.style.transition = "height .15s ease-in";

      if (dt < 5000) {
        if (Math.abs(dx) > 60) {
          if (dx > 0) {
            console.log('swipe top')
          } else {
            console.log('swipe down')
          }
        }
      }
    }
  }
  */

  intervalCurrentTime;
  currentTime: number = 0;

  constructor(
    private el: ElementRef,
    private soundcloud: Soundcloud
  ) {
    console.log(this.el)
    this.soundcloud.thisTrack$.subscribe((data) => {
      // console.log('Player subscribe track', data);
      this.currentTrack = data;
    });
    this.soundcloud.play$.subscribe((data) => {
      switch (data) {
        case 'play':
          this.isPlaying = true;
          if (this.intervalCurrentTime) {
            window.clearInterval(this.intervalCurrentTime);
          }
          this.intervalCurrentTime = window.setInterval(() => {
            let current = this.soundcloud.currentTime();
            this.currentTime = current;
            if (current >= this.currentTrack.duration) {
              window.clearInterval(this.intervalCurrentTime);
            }
          }, 500);
          break;
        case 'pause':
          this.isPlaying = false;
          if (this.intervalCurrentTime) {
            window.clearInterval(this.intervalCurrentTime);
          }
          // console.log('clearInterval: ', this.intervalCurrentTime)
          break;
        default:
          this.isPlaying = false;
          clearInterval(this.intervalCurrentTime);
      }
    });
    this.soundcloud.openPlayer$.subscribe((data) => {
      if (data) {
        this.el.nativeElement.classList.add('open');
      }
    });
  }

  ngOnInit() {
    // this.onElementHeightChange(this.el.nativeElement)
    console.log(this.player)
    this.player.nativeElement.parentElement.style.height = this.player.nativeElement.parentElement.parentElement.clientHeight + "px"
    this.player.nativeElement.parentElement.style.top = this.player.nativeElement.parentElement.clientHeight - 62 +"px";
  }

  ngOnChanges(changes) {
    console.log('Changes: ', changes)
    this.newH = this.el.nativeElement.clientHeight
  }

  function(e) {
    e.stopPropagation();
    e.preventDefault();
    console.log(console.log(this.gauge))
    let limit = 565
    let o = 0;
    let interval = setInterval(() => {
      this.gauge.nativeElement.style.strokeDasharray = o++ + ', 564';
      if (o >= limit) {
        clearInterval(interval);
      }
    }, 100);
    interval;
  }

  // play(e) {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   let limit = 565
  //   let o = 0;
  //   let interval = setInterval(() => {
  //     this.gauge.nativeElement.style.strokeDasharray = o++ + ', 564';
  //     if (o >= limit) {
  //       clearInterval(interval);
  //     }
  //   }, 100);
  //   interval;
  // }

  panEvent(e) {
    console.log(e.additionalEvent, e.angle)
    if (e.additionalEvent === "panup" || (e.angle < 0 && e.angle > -180)) {
      this.el.nativeElement.classList.add('open');
    } else if (e.additionalEvent === "pandown" || (e.angle > 0 && e.angle < 180)) {
      this.el.nativeElement.classList.remove('open');
    }
  }

  onElementHeightChange(element) {
    let lastHeight = element.clientHeight;
    let newHeight;
    this.run(element, newHeight, lastHeight);
  }

  run(elem, newH, lastH) {
    newH = elem.clientHeight;
    if (lastH != newH) {
      this.newH = newH;
    }
    if (elem.onElementHeightChangeTimer) {
      clearTimeout(elem.onElementHeightChangeTimer);
    }
    elem.onElementHeightChangeTimer = setTimeout(this.run(elem, newH, lastH), 2000);
  }

  playPause() {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.soundcloud.play();
    } else {
      this.soundcloud.pause();
    }
  }

  showArtist(artist) {
    console.log(artist);
    if (this.el.nativeElement.classList.contains('open')) {
      this.el.nativeElement.classList.remove('open');
    }
  }

  showTrack(track) {
    console.log(track);
    if (this.el.nativeElement.classList.contains('open')) {
      this.el.nativeElement.classList.remove('open');
    }
  }

  formatTime(time) {
    let minutes = Math.floor(time / 60000);
    let stringMinutes = (minutes >= 10) ? minutes : "0" + minutes;
    let seconds = Math.floor((time % 60000) / 1000);
    let stringSeconds = (seconds >= 10) ? seconds : "0" + seconds;
    return stringMinutes + ':' + stringSeconds;
  }

  getHigh(src) {
    if (src === null) {
      return 'https://placeholdit.imgix.net/~text?txtsize=33&txt=No%20Thumbnail&w=500&h=500'
    } else {
      let split = src.split('large');
      return split[0] + 't500x500' + split[1];
    }
  }

}
