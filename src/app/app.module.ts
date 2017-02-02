import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';

import { firebaseConfig } from '../firebaseConfig';

import { Soundcloud } from '../providers/soundcloud';
import { MyApp } from './app.component';
import { HomePage, HeartPage, MenuPage, SearchPage, PlaylistPage, ProfilPage } from '../pages/index';
import { 
  PlayerComponent,
  PlaylistComponent,
  InfosTabComponent,
  TitresTabComponent,
  AbonnementsTabComponent,
  AbonnesTabComponent,
  TrackComponent
} from '../components/index';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    HeartPage,
    MenuPage,
    SearchPage,
    PlaylistPage,
    ProfilPage,
    PlayerComponent,
    PlaylistComponent,
    InfosTabComponent,
    TitresTabComponent,
    AbonnementsTabComponent,
    AbonnesTabComponent,
    TrackComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      tabsPlacement: 'top'
    }),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    HeartPage,
    MenuPage,
    SearchPage,
    PlaylistPage,
    ProfilPage,
    PlayerComponent,
    PlaylistComponent,
    InfosTabComponent,
    TitresTabComponent,
    AbonnementsTabComponent,
    AbonnesTabComponent,
    TrackComponent
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Soundcloud]
})
export class AppModule {}
