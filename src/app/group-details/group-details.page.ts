import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { rankingservice } from '../services/ranking.service';
import { GrupoService } from '../services/grupo.service';
import { groupTask, rankingTask } from '../models/model.interface';
import { LoadingController, NavController } from '@ionic/angular'
import { Subscription } from 'rxjs'
import * as firebase from 'firebase'

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.page.html',
  styleUrls: ['./group-details.page.scss'],
})
export class GroupDetailsPage implements OnInit {
  grupos: groupTask[]
  nombre: string
  gruposId: string[]
  id: string
  usuarios: string[]
  sub1: Subscription = new Subscription()
  sub2: Subscription = new Subscription()
  sub3: Subscription = new Subscription()
  usuariosGrupo: rankingTask[] = [{
    username:'Datuak prozesatzen',puntuacionS:null,puntuacionG:null,grupos:[],lastWeek:null,ultimaPartida:'',
  }]
  gruposUsuarios: string[] = []
  
  constructor(private navCtrl: NavController,private router: ActivatedRoute, private rankingService: rankingservice, private grupoService: GrupoService, private loadingControler: LoadingController) { }


  ngOnInit() {
    // this.nombre = this.router.snapshot.params['id']
    // this.idGrupos()


  }
  async ionViewWillEnter() {
    const loading = await this.loadingControler.create({
      message: 'Loading'
    });
    await loading.present();
    
    this.sub1.unsubscribe()
    this.sub2.unsubscribe()
    this.sub3.unsubscribe()
    loading.dismiss();
    this.nombre = this.router.snapshot.params['id']
    this.idGrupos()

  }

  idGrupos() {
    this.usuarios = []
    this.sub1 = this.grupoService.getgrupos().subscribe(res => {
      this.grupos = res
      for (var i = 0; i < this.grupos.length; i++) {
        if (this.grupos[i].nombre == this.nombre) {
          this.id = this.grupos[i].id
          this.sub2 = this.grupoService.getGrupo(this.id).subscribe(res => {
            this.usuarios = res.usuarios


          })
          break
        }

        if(this.grupos[i].creador == firebase.auth().currentUser.uid){
          document.getElementById('basura').innerHTML="<ion-fab vertical='bottom' horizontal='end' slot='fixed'><ion-fab-button routerDirection='forward'><ion-icon name='trash'></ion-icon></ion-fab-button></ion-fab>"
        }

      } for (var i = 0; i < this.usuarios.length; i++) {
        this.sub3 = this.rankingService.getTodo(this.usuarios[i]).subscribe(res => {
          if(this.usuariosGrupo[0].username=='Datuak prozesatzen'){
            this.usuariosGrupo.splice(0,1)
          }
          
          this.usuariosGrupo.push(res)
        })
      }

      // for(var i=0;i<this.usuarios.length;i++){
      //   this.rankingService.getTodo(this.usuarios[i]).subscribe(res=>{
      //     console.log(res.username)
      //   })
      // }
    })

  }

  ionViewWillLeave() {
    this.sub1.unsubscribe()
    this.sub2.unsubscribe()
    this.sub3.unsubscribe()
  }

  volver()
  {
    this.navCtrl.navigateForward('')
  }
  delete(){
    console.log('aaa')
    console.log(this.grupos)
  }

}
