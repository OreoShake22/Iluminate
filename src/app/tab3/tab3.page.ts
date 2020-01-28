import { Component, OnInit } from '@angular/core';

import {rankingservice} from '../services/ranking.service';
import {GrupoService} from '../services/grupo.service';
import { rankingTask } from "../models/model.interface";
import * as firebase from 'firebase'

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  grupo:rankingTask[];
  sGroup:string[]
  groupIzen:string[]
  constructor( private rankingService:rankingservice,  private grupoService:GrupoService) {
  }
  ngOnInit()
    {
      
  }
  ionViewWillEnter ()
    {
      this.rankingService.getTodo(firebase.auth().currentUser.uid).subscribe(res=>{
        this.sGroup=res.grupos
        this.funcion()
                
    })
    }

  funcion()
  {
    this.groupIzen=[]
    for(var i=0;i<this.sGroup.length;i++){
      var a=this.sGroup[i]
      this.grupoService.getGrupo(a).subscribe(res=>{
        this.groupIzen.push(res.nombre)
      })
      
}

  }

  
}
