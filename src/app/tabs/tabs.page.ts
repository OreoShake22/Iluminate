import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private navCtrl: NavController) {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log("haha xd")
      } else {
        this.navCtrl.navigateForward('/log');

      }
    });
  }

}
