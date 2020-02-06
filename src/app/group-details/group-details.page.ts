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
    username:'',puntuacionS:null,puntuacionG:null,grupos:[],lastWeek:null,ultimaPartida:'',
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
    this.nombre = this.router.snapshot.params['nombre']
    this.id = this.router.snapshot.params['id']
    this.idGrupos()
    
    

  }

  async idGrupos() {
    this.usuarios = []
    this.sub1 = this.grupoService.getGrupo(this.id).subscribe(grupo=>{
      if(grupo.creador==firebase.auth().currentUser.uid){
        document.getElementById('basura').innerHTML="<ion-fab vertical='bottom' horizontal='end' slot='fixed'><ion-fab-button routerDirection='forward'><ion-icon name='trash'></ion-icon></ion-fab-button></ion-fab>"
      }
     this.gruposId=grupo.usuarios
     this.gruposId.forEach(userId=>{
      this.rankingService.getTodo(userId).subscribe(usuario=>{
        usuario.id=userId
        this.usuariosGrupo.push(usuario)
      })
      
    })
    })
  }

  ionViewWillLeave() {
    this.sub1.unsubscribe()
    this.sub2.unsubscribe()
    this.sub3.unsubscribe()
    
  }

  volver()
  {
    
    this.navCtrl.navigateForward('/tabs/tab3')
  }
  delete(){
    this.rankingService.getranking().subscribe(res=>{
      res.forEach(usuario=>{
        var usu=usuario.grupos
        console.log(usu, usuario.id)
        for(var i=0;usuario.grupos.length>=i;i++){
          if(usuario.grupos[i]==this.id){
            usuario.grupos.splice(i,1)
            this.rankingService.updateTodo(usuario,usuario.id);
            i--;
          }
        }
      })
    })
    this.navCtrl.navigateForward('')
    alert(' el Grupo '+this.nombre+' eliminado')
    this.grupoService.deleteGrupo(this.id);
  }
}
