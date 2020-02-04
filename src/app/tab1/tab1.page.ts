import { Component, OnInit } from '@angular/core';
import { rankingTask } from "../models/model.interface";
import { preguntasservice } from '../services/galderak.service';
import { rankingservice } from '../services/ranking.service';
import { galderakTask } from "../models/model.interface";
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase'

import { TimeService } from '../services/time.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']

})
export class Tab1Page {
  preguntas: galderakTask[];
  disponible=true;
  ranking1: rankingTask = {
    username: '',
    puntuacionS: 0,
    puntuacionG: 0,
    ultimaPartida: '0',
    lastWeek: 0,
    grupos: []
  };
  dia: any;
  fecha: string = '';
  constructor(private navCtrl: NavController, private preguntasservice: preguntasservice, private rankingService: rankingservice, public timeServices: TimeService) {


  }


  ionViewWillEnter() {
    this.getPosts();
  }


  jokatu() {
    
    var yo;
    var semana;
    var userId = firebase.auth().currentUser.uid
    let fecha = this.rankingService.getTodo(userId).subscribe(res => {
      this.fecha = res.ultimaPartida;
      yo = res.username;
      this.ranking1.username=yo
      semana=res.lastWeek
      this.ranking1.id = userId
      if(semana!=this.ranking1.lastWeek){
        this.rankingService.updateSemana(this.ranking1, this.ranking1.id)
      }
      if (this.fecha != '') {
        if (this.fecha == this.dia) {
          alert('ya has jugadoooo')
        }
        else {

          
          this.rankingService.updateTime(this.ranking1, this.ranking1.id)
          this.navCtrl.navigateForward('partida')
        }
        fecha.unsubscribe()
      }
    });
    //if(this.fecha==this.dia && yo!='OreoShake'){

  
  }

  getPosts() { //llamamos a la funcion getPost de nuestro servicio.
    this.timeServices.getHour()
      .then(data => {
        this.dia = data['datetime'];
        this.dia = this.dia.substring(0, this.dia.indexOf("T"));
        this.ranking1.ultimaPartida = this.dia;
        this.ranking1.lastWeek = data['week_number'];
      });
  }
}
