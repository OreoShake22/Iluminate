import { Component, NgZone } from '@angular/core';
import { AuthenticateService } from '../services/autentication.service';
import { UsuarioService } from '../services/usuario.service';
import { rankingTask } from "../models/model.interface";
import * as firebase from 'firebase'
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { NavController, AlertController } from '@ionic/angular';
//ionic cordova plugin add cordova-plugin-file
//npm install @ionic-native/file

import { ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  usuario: rankingTask = {
    username: '',
    puntuacionS: 0,
    puntuacionG: 0,
    ultimaPartida: '',
    lastWeek: 0,
    grupos: []
  };
  firestore = firebase.storage();
  imgsource: any;
  name: string = "";
  mail: string = "";
  myphoto: string;

  captureDataUrl: string;
  alertCtrl: AlertController;

  croppedImagepath = "";
  isLoading = false;

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };
  constructor(
    private authService: AuthenticateService,
    private usuarioservice: UsuarioService,
    public actionSheetController: ActionSheetController,
    private imagePicker: ImagePicker,
    public navCtrl: NavController, private camera: Camera, private file: File, alertCtrl: AlertController,
    public zone: NgZone
  ) { }


  logOut(value) {
    this.authService.logoutUser()
    navigator['app'].exitApp()
  }
  change() {
    var auth = firebase.auth();
    var emailAddress = firebase.auth().currentUser.email;

    auth.sendPasswordResetEmail(emailAddress).then(function () {
      alert('Mezua bidali da ' + emailAddress + ' mailera')
    }).catch(function (error) {
      // An error happened.
    });
  }

  ionViewWillEnter() {
    this.usuarioservice.getUsuario(firebase.auth().currentUser.uid).subscribe(algo => {
      this.usuario = algo;
    })
    this.mail = firebase.auth().currentUser.email
    this.display()

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
      saveToPhotoAlbum: false
    }

    this.camera.getPicture(options).then((captureDataUrl) => {
      this.captureDataUrl = 'data:image/jpeg;base64,' + captureDataUrl;
    }, (err) => {
      console.log(err);
    });


  }

  upload() {
    let storageRef = firebase.storage().ref();
    // Create a timestamp as filename
    const filename = firebase.auth().currentUser.uid;

    // Create a reference to 'images/todays-date.jpg'
    const imageRef = storageRef.child(`images/${filename}.jpg`);

    imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL)
      .then((snapshot) => {
        console.log('url: '+this.captureDataUrl)
        // Do something here when the data is succesfully uploaded!
        this.showSuccesfulUploadAlert();
      });
  }

  async showSuccesfulUploadAlert() {
    let alert = await this.alertCtrl.create({
      header: 'Uploaded!',
      buttons: ['OK']
    });
    alert.present();
    // clear the previous photo data in the variable
    this.captureDataUrl = "";
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


  display() {
    this.firestore.ref().child('images/'+firebase.auth().currentUser.uid+'.jpg').getDownloadURL().then((url) => {
      this.zone.run(() => {
        this.imgsource = url;
        this.myphoto=url
      })
    })
  }
}
