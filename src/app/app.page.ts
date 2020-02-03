import { Component } from '@angular/core';
import { AuthenticateService } from './services/autentication.service';
import {UsuarioService} from './services/usuario.service';
import { rankingTask } from "./models/model.interface";
import * as firebase from 'firebase'
import { ImagePicker,ImagePickerOptions  } from '@ionic-native/image-picker/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { NavController, AlertController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
//ionic cordova plugin add cordova-plugin-file
//npm install @ionic-native/file

import { ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class AppPage {
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

}