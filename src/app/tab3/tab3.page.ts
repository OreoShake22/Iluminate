import { Component, OnInit } from '@angular/core';

import { rankingservice } from '../services/ranking.service';
import { GrupoService } from '../services/grupo.service';
import { rankingTask, groupTask } from "../models/model.interface";
import * as firebase from 'firebase'
import { AlertController } from '@ionic/angular';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  grupo: rankingTask;
  sGroup: string[];
  gruposId: string[];
  groupIzen: string[];
  antonio: groupTask[];
  aa: boolean

  constructor(private rankingService: rankingservice, private grupoService: GrupoService, public atrCtrl: AlertController) {
  }
  ngOnInit() {

  }
  ionViewWillEnter() {
    this.rankingService.getTodo(firebase.auth().currentUser.uid).subscribe(res => {
      this.grupo=res;
      this.sGroup = res.grupos
      this.funcion()
      this.idGrupos()
    })
  }

  funcion() {
    this.groupIzen = []
    for (var i = 0; i < this.sGroup.length; i++) {
      var a = this.sGroup[i]
      this.grupoService.getGrupo(a).subscribe(res => {
        this.groupIzen.push(res.nombre)
      })

    }

  }

  idGrupos() {
    this.gruposId = []
    this.grupoService.getgrupos().subscribe(res => {
      this.antonio = res
      
      console.log(this.antonio)
      for (var i = 0; i < this.antonio.length; i++) {
        this.gruposId.push(this.antonio[i].nombre)
      }
    })
  }

  async insertGroup() {
    const alert = await this.atrCtrl.create({
      header: 'Taldera sartu',
      inputs: [
        {
          name: 'izena',
          value: '',
          type: 'text',
          placeholder: 'taldearen izena',
          id: 'izena'
        }
      ],
      buttons: [
        {
          text: 'Ezeztatu',

          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Gorde',
          handler: async data => {
            var a = data.izena
            for (var i = 0; i < this.gruposId.length; i++) {
              var b = this.gruposId[i]
              
              if (a == b) {
                this.aa = true
                this.PassAlert(this.antonio[i])
                break;
              }
              else {
                this.aa = false
              }
            }
            if (this.aa == false) {
              this.alertNoGroup()
            }
          },
        }
      ]
    });

    await alert.present();

  }

  async alertNoGroup() {
    const alert = await this.atrCtrl.create({
      header: 'Taldea ez da aurkitu',

      buttons: [
        {
          text: 'Itxi',

          role: 'cancel',
          cssClass: 'secondary'
        },

      ]
    });

    await alert.present();

  }
  async PassAlert(grupo: groupTask) {
    const alert = await this.atrCtrl.create({
      header: 'Pasahitza sartu',
      inputs: [
        {
          name: 'pass',
          value: '',
          type: 'password',
          placeholder: 'pass',
          id: 'pass'
        }
      ],
      buttons: [
        {
          text: 'Ezeztatu',

          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Gorde',
          handler: async data => {
            var pass = data.pass
            if(pass==grupo['contraseña']){
              console.log(grupo.id)
              this.grupo.grupos.push(grupo.id)
              this.rankingService.updateTodo(this.grupo,firebase.auth().currentUser.uid)
            }
            else{
              this.PassAlert(grupo)
            }
          },
        }
      ]
    });

    await alert.present();

  }
  
}
