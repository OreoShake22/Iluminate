import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { rankingservice } from '../services/ranking.service';
import { GrupoService } from '../services/grupo.service';
import { rankingTask, groupTask } from "../models/model.interface";
import * as firebase from 'firebase'
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs'

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
  checkUserGroup: boolean = false
  aa: boolean
  sub1: Subscription = new Subscription()
  sub2: Subscription = new Subscription()
  sub3: Subscription = new Subscription()
  talde: groupTask = {
    nombre: '',
    contra: '',
    usuarios: [],

  }



  constructor(private navCtrl: NavController, private rankingService: rankingservice, private grupoService: GrupoService, public atrCtrl: AlertController) {
  }
  ngOnInit() {

  }

  ionViewWillEnter() {
    try {
      this.sub3 = this.rankingService.getTodo(firebase.auth().currentUser.uid).subscribe(res => {
        this.grupo = res;
        this.sGroup = res.grupos
        this.groupName()
        this.idGrupos()
      })
    }
    catch{
      this.navCtrl.navigateForward('')
    }

  }
  a() {}

  groupName() {
    this.groupIzen = []
    for (var i = 0; i < this.sGroup.length; i++) {
      var a = this.sGroup[i]
      this.sub2 = this.grupoService.getGrupo(a).subscribe(res => {
        this.groupIzen.push(res.nombre)
      })
    }

  }

  idGrupos() {
    this.gruposId = []
    this.sub1 = this.grupoService.getgrupos().subscribe(res => {
      this.antonio = res

      for (var i = 0; i < this.antonio.length; i++) {
        this.gruposId.push(this.antonio[i].nombre)
      }
    })
  }

  async insertGroup() {
    const alert = await this.atrCtrl.create({
      header: 'Taldea sartu',
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
            for (var i = 0; i < this.groupIzen.length; i++) {
              if (a == this.groupIzen[i]) {
                this.checkUserGroup = true
                break;

              }

            }
            if (this.checkUserGroup == false) {
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
            }
            else if (this.checkUserGroup == true) {
              this.alertNoGroup(a + ' taldean zaude')
            }

            if (this.aa == false) {
              this.alertNoGroup(a + ' taldea ez da aurkitu')
            }
          },
        }
      ]
    });

    await alert.present();

  }

  async alertNoGroup(a) {
    const alert = await this.atrCtrl.create({
      header: a,

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
            if (pass == grupo['contraseña']) {
              this.grupo.grupos.push(grupo.id)
              this.rankingService.updateTodo(this.grupo, firebase.auth().currentUser.uid)
            }
            else {
              this.PassAlert(grupo)
            }
          },
        }
      ]
    });

    await alert.present();

  }

  async createGroup() {
    const alert = await this.atrCtrl.create({
      header: 'Taldea sortu',
      inputs: [
        {
          name: 'izena',
          value: '',
          type: 'text',
          placeholder: 'taldearen izena',
          id: 'izena'
        },
        {
          name: 'pass',
          value: '',
          type: 'password',
          placeholder: 'pasahitza',
          id: 'pass'
        },
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
            var existe = false
            this.talde.nombre = data.izena
            this.talde.contra = data.pass
            this.talde.usuarios.push(firebase.auth().currentUser.uid)
            for (var i = 0; i < this.gruposId.length; i++) {
              if (data.izena == this.groupIzen[i]) {
                this.alertNoGroup(data.izena + ' talde izena hartuta dago')
                existe = true;
                break;
              }

            }
            if (existe == false) {
              var id = (this.grupoService.addGroup(this.talde))
              this.grupo.grupos.push(id)
              this.rankingService.añadirGrupo(this.grupo, firebase.auth().currentUser.uid)
              this.navCtrl.navigateForward('group-details/' + this.talde.nombre)
              this.a()

            }

          },
        }
      ]
    });

    await alert.present();

  }

}
