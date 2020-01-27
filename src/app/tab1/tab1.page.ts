import {Component, OnInit} from '@angular/core';
import { rankingTask } from "../models/model.interface";
import {preguntasservice} from '../services/galderak.service';
import {rankingservice} from '../services/ranking.service';
import { galderakTask } from "../models/model.interface";
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase'

import { TimeService } from '../services/time.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
  
})
export class Tab1Page implements OnInit{
  preguntas:galderakTask[];
  ranking:rankingTask[];
  ranking1:rankingTask={
    username:'',
    puntuacionS:0,
    puntuacionG:0,
    ultimaPartida:'0',
  };
  dia:any;
  constructor(private navCtrl: NavController,private preguntasservice:preguntasservice, private rankingService:rankingservice, public timeServices:TimeService) {
    
    
  }
  ngOnInit()
    {
      
      
    }
    ionViewWillEnter ()
    {
      this.getPosts();
      this.rankingService.getTodo(firebase.auth().currentUser.uid).subscribe(res => {
      this.ranking1 = res;
      });
      
    }
   
    
    jokatu(){
      this.ranking1.id=firebase.auth().currentUser.uid
      this.rankingService.updateTime(this.ranking1, this.ranking1.id)
    }
    
    getPosts() { //llamamos a la funcion getPost de nuestro servicio.
      this.timeServices.getHour()
      .then(data => {
        this.dia = data;
        this.dia=this.dia.substring(0,this.dia.indexOf("T"));
        this.ranking1.ultimaPartida=this.dia;
      });
    }
}
