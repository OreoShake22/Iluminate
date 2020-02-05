import { Component, OnInit } from '@angular/core';
import {rankingservice} from '../services/ranking.service';
import { rankingTask } from "../models/model.interface";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  ranking:rankingTask[];

  constructor(private rankingservice:rankingservice) {
    
  }
  ngOnInit()
    {
      this.rankingservice.getranking().subscribe(res=>{
        this.ranking=res;
      })
      
    }

  
}
