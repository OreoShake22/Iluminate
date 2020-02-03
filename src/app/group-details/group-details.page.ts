import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router, ActivatedRoute } from '@angular/router';
import { rankingservice } from '../services/ranking.service';
import * as firebase from 'firebase'
import { GrupoService } from '../services/grupo.service';
import { groupTask } from '../models/model.interface';
import {LoadingController} from '@ionic/angular'

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
  usuarios:string[]
  constructor(private router: ActivatedRoute, private rankingService: rankingservice, private grupoService: GrupoService, private loadingControler:LoadingController) { }

  
  ngOnInit() {
    
    // this.nombre = this.router.snapshot.params['id']
    // this.idGrupos()
    

  }
  ionViewWillEnter(){
    this.nombre = this.router.snapshot.params['id']
    let junkeo=this.idGrupos()

  }
  
  idGrupos() {
    this.usuarios=[]
    this.grupoService.getgrupos().subscribe(res => {
      this.grupos = res
      for (var i = 0; i < this.grupos.length; i++) {
        if (this.grupos[i].nombre == this.nombre) {
          this.id = this.grupos[i].id
          this.grupoService.getGrupo(this.id).subscribe(res=>{
            this.usuarios=res.usuarios
            for(var i=0;i<this.usuarios.length;i++){
              this.rankingService.getTodo(this.usuarios[i]).subscribe(res=>{
                console.log(res.username)
              })
            }
            
          })
          break
        }
        
      }
      
    for(var i=0;i<this.usuarios.length;i++){
      this.rankingService.getTodo(this.usuarios[i]).subscribe(res=>{
        console.log(res.username)
      })
    }
    })
    
  }


}
