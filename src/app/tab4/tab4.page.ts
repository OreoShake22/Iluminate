import { Component } from '@angular/core';
import { AuthenticateService } from '../services/autentication.service';
import {UsuarioService} from '../services/usuario.service';
import { rankingTask } from "../models/model.interface";
import * as firebase from 'firebase'

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  usuario:rankingTask={
    uid:'',
    username:'',
    puntuacionS:0,
    puntuacionG:0,
  };
  name:string="";
  mail:string="";
  constructor(
    private authService: AuthenticateService,
    private usuarioservice:UsuarioService
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
}
