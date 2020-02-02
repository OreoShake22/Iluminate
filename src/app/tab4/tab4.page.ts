import { Component } from '@angular/core';
import { AuthenticateService } from '../services/autentication.service';
import {UsuarioService} from '../services/usuario.service';
import { rankingTask } from "../models/model.interface";
import * as firebase from 'firebase'
import { ImagePicker,ImagePickerOptions  } from '@ionic-native/image-picker/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { NavController, LoadingController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
//ionic cordova plugin add cordova-plugin-file
//npm install @ionic-native/file

import { ActionSheetController } from '@ionic/angular';


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

  croppedImagepath = "";
  isLoading = false;

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };
  constructor(
    private authService: AuthenticateService,
    private usuarioservice:UsuarioService,
    public actionSheetController: ActionSheetController,
    private imagePicker:ImagePicker,
    public navCtrl: NavController, private camera: Camera,  private file: File, private loadingCtrl:LoadingController,
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
    
  //   this.camera.getPictures(options).then((results) => {
  //     for (var i = 0; i < results.length; i++) {
  //         console.log('Image URI: ' + results[i]);
  //     }
  //   }, (err) => { });
  // }


  getImage() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.myphoto = 'data:image/jpeg;base64,' + imageData;
      alert()
      this.uploadPicture('aaa') 
      
    }, (err) => {
      // Handle error
    });
    
    
  }

  async uploadPicture(imageString) {
    const storageRef = firebase
    .storage()
    .ref("/profilePicture.jpg");
   
    const uploadedPicture = await storageRef.putString(imageString, 'base64', {
    contentType: 'image/jpg'
    });
   
    const downloadURL = await storageRef.getDownloadURL();
    alert(downloadURL)
   }

  

  // cropImage() {
  //   const options: CameraOptions = {
  //     quality: 70,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  //     saveToPhotoAlbum: false,
  //     allowEdit:true,
  //     targetWidth:300,
  //     targetHeight:300
  //   }

  //   this.camera.getPicture(options).then((imageData) => {
  //     // imageData is either a base64 encoded string or a file URI
  //     // If it's base64:
  //     this.myphoto = 'data:image/jpeg;base64,' + imageData;
  //   }, (err) => {
  //     // Handle error
  //   });
  // }


 
}
