import { Component } from '@angular/core';
import { TabsPage } from './tabs/tabs.page';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { rankingTask } from "./models/model.interface";
import { SmartAudioService } from './services/smart-audio.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  usuario:rankingTask={
    username:'',
    puntuacionS:0,
    puntuacionG:0,
    ultimaPartida:'',
    lastWeek:0,
    grupos:[]
  };
  name:string='julen';
  imagen:'';
  audio:any;
  rootPage:any = TabsPage;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    smartAudioService: SmartAudioService
  ) {
    this.audio=smartAudioService;
    this.initializeApp();
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.platform.backButton.subscribeWithPriority(9999, () => {
        document.addEventListener('backbutton', function (event) {
          event.preventDefault();
          event.stopPropagation();
          console.log('hello');
        }, false);
      });
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.audio.preload('tabSwitch', 'assets/audio/boop.mp3');
    });
  }


  
}
