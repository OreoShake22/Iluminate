import { Component } from '@angular/core';
import { AuthenticateService } from '../services/autentication.service';
import {UsuarioService} from '../services/usuario.service';
import { rankingTask } from "../models/model.interface";
import * as firebase from 'firebase'
import { ImagePicker,ImagePickerOptions  } from '@ionic-native/image-picker/ngx';
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
    ultimaPartida:'',
    lastWeek:0,
    grupos:[]
  };
  name:string="";
  mail:string="";
  myphoto:string;
  constructor(
    private authService: AuthenticateService,
    private usuarioservice:UsuarioService,
    private camera: Camera,
    private imagePicker:ImagePicker
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

  // getImg()
  // {
  //   let options = {
  //     width: 500,
  //     height: 500,
  //     quality: 75,
  //     maximumImagesCount: 10
  //   }
    
  //   this.imagePicker.getPictures(options).then((results) => {
  //     for (var i = 0; i < results.length; i++) {
  //         console.log('Image URI: ' + results[i]);
  //     }
  //   }, (err) => { });
  // }
 
}
