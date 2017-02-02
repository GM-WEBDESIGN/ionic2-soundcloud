import { Component, Inject } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { AngularFireAuth, AuthMethods, AuthProviders, AngularFire, FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';

import { HomePage } from '../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = HomePage;

  constructor(platform: Platform, private AngularAuth: AngularFireAuth, private alertCtrl: AlertController, private af: AngularFire, @Inject(FirebaseApp) private firebaseApp: firebase.app.App) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault()
      StatusBar.backgroundColorByHexString('#efefef');
      Splashscreen.hide();
    });

    this.AngularAuth.subscribe((user) => {
      if (user === null) {
        this.AngularAuth.login({method: AuthMethods.Anonymous, provider: AuthProviders.Anonymous}).then((user) => {
          console.log('User auth: ', user);
          if (user) {
            let modal = this.alertCtrl.create({
              title: "Plus d'informations sur vous",
              inputs: [
                {
                  name: 'nom',
                  placeholder: 'Votre nom',
                  type: 'text'
                },
                {
                  name: 'email',
                  placeholder: 'Votre email',
                  type: 'email'
                }
              ],
              buttons: [
                {
                  text: 'Enregistrer',
                  handler: data => {
                    if (data.nom && data.email) {
                      this.af.database.object('users/' + user.uid).set(data).then(() => console.log('data saved')).catch((error) => console.log('Error save', error));
                      let credentials = firebase.auth.EmailAuthProvider.credential(data.email, data.nom);
                      firebaseApp.auth().currentUser.link(credentials).then((user) => {
                        console.log('Anonymous account successfully upgraded', user);
                      })
                      .catch((error) => {
                        console.log('Error upgrading anonymous account', error);
                      });
                    }
                  }
                }
              ]
            });

            modal.present();
          }
        });
      }
    });

  }
}
