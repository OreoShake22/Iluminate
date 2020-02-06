import { Component, OnInit } from '@angular/core';
import { rankingservice } from '../services/ranking.service';
import { rankingTask } from "../models/model.interface";
import * as firebase from 'firebase'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  ranking: rankingTask[];
  User: rankingTask = {
    username: '',
    puntuacionS: 0,
    puntuacionG: 0,
    ultimaPartida: '0',
    lastWeek: 0,
    grupos: []
  };
  id: string

  constructor(private rankingservice: rankingservice) {

  }
  ngOnInit() {
    this.rankingservice.getranking().subscribe(res => {
      this.ranking = res;
    })
  }

  ionViewWillEnter() {
    this.rankingservice.getTodo(firebase.auth().currentUser.uid).subscribe(res => {
      this.User = res
    })
    this.id = firebase.auth().currentUser.uid
  }


}
