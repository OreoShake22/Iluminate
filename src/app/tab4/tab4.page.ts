import { Component } from '@angular/core';
import { AuthenticateService } from '../services/autentication.service';
import {UsuarioService} from '../services/usuario.service';
import { rankingTask } from "../models/model.interface";
import * as firebase from 'firebase'
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  usuario:rankingTask={
    username:'',
    puntuacionS:0,
    puntuacionG:0,
    ultimaPartida:''
  };
  name:string="";
  mail:string="";
  myphoto:string;
  constructor(
    private authService: AuthenticateService,
    private usuarioservice:UsuarioService,
    private camera: Camera
  ) {}


  logOut(value){
    this.authService.logoutUser()
  }
  change()
  {
    var auth = firebase.auth();
    var emailAddress = firebase.auth().currentUser.email;

    auth.sendPasswordResetEmail(emailAddress).then(function() {
     alert('Mezua bidali da '+ emailAddress + ' mailera' )
    }).catch(function(error) {
      // An error happened.
    });
  }

  ionViewWillEnter ()
  {
    this.usuarioservice.getUsuario(firebase.auth().currentUser.uid).subscribe(algo=>{
      this.usuario=algo;
    })
    this.mail=firebase.auth().currentUser.email
  }

  getImg()
  {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }
}
