import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { NavController } from '@ionic/angular';
import { SmartAudioService } from '../smart-audio.service';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{

  constructor(public navCtrl: NavController,public smartAudio: SmartAudioService) {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
      } else {
        this.navCtrl.navigateForward('/login');

      }
    }.bind(this));
  }
  

  ngOnInit() {
    
  }

  changeTab() {
    this.smartAudio.play('tabSwitch');
}

}
