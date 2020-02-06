import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore'

import { AuthenticateService } from './services/autentication.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ReactiveFormsModule } from '@angular/forms';

import * as firebase from 'firebase';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { rankingservice } from './services/ranking.service';
import { UsuarioService } from './services/usuario.service';

import { HttpClientModule } from '@angular/common/http';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File } from '@ionic-native/file/ngx';
import { Tab3Page } from 'src/app/tab3/tab3.page';

import { SmartAudioService } from './services/smart-audio.service';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

firebase.initializeApp(environment.firebase);
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeAudio,
    Camera,
    FileChooser,
    File,
    ImagePicker,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthenticateService,
    AngularFireAuthGuard,
    rankingservice,
    UsuarioService,
    SmartAudioService,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
