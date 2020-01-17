import {Component, OnInit} from '@angular/core';
import { rankingTask } from "../models/model.interface";
import {rankingservice} from '../services/ranking.service';
import {preguntasservice} from '../services/galderak.service';
import { galderakTask } from "../models/model.interface";
import { NavController } from '@ionic/angular';

import * as firebase from 'firebase'
import { AuthenticateService } from '../services/autentication.service';
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
  
})
export class Tab1Page implements OnInit{
  preguntas:galderakTask[];
  ranking:rankingTask[];
  ranking2:rankingTask={
    id:'',
    username:'',
    puntuacionS:0,
    puntuacionG:0,
  };
  rankId=null;

  constructor(private navCtrl: NavController,private rankingservice:rankingservice,private preguntasservice:preguntasservice,
    private authService: AuthenticateService, private router:ActivatedRoute) {
    
    
  }
  ngOnInit()
    {
      
    this.rankId=this.router.snapshot.params['8g7nfcxZmDa5rJqAUPOgPwweO8y2'];
      this.rankingservice.getranking().subscribe(res=>{
        this.ranking=res;
      });
      
    }

    async getUser()
    { 
    this.rankingservice.getTodo(this.rankId).subscribe(res=>{
    this.ranking2=res;
    });

    }





    

  
}
