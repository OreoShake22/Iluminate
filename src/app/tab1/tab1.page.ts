import {Component, OnInit} from '@angular/core';
import { rankingTask } from "../models/model.interface";
import {rankingservice} from '../services/ranking.service';
import {preguntasservice} from '../services/galderak.service';
import { galderakTask } from "../models/model.interface";
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
  
})
export class Tab1Page implements OnInit{
  preguntas:galderakTask[];
  ranking:rankingTask[];

  constructor(private navCtrl: NavController,private rankingservice:rankingservice,private preguntasservice:preguntasservice) {
    
    
  }
  ngOnInit()
    {
      this.rankingservice.getranking().subscribe(res=>{
        this.ranking=res;
      });

      
      
    }

    

  
}
