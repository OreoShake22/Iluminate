import { Component, OnInit } from '@angular/core';
import { rankingTask } from "../models/rankingTask.interface";
import {rankingservice} from '../services/ranking.service';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';
import * as firebase from 'firebase';
@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.page.html',
  styleUrls: ['./todo-details.page.scss'],
})
export class todoDetailsPage implements OnInit {
  ranking:rankingTask={
    id:'',
    username:'',
    puntuacionS:0,
    puntuacionG:0,
  };
  inputvalue:string='';


  constructor(private rankingservice:rankingservice,private nav:NavController) { }

  ngOnInit() {
  }
  guardar(){
    this.ranking.username=((document.getElementById("text") as HTMLInputElement).value);
    this.ranking.id=firebase.auth().currentUser.uid;
    this.rankingservice.addTodo(this.ranking).then(() =>{
      this.nav.navigateForward('/')
    })
}
}