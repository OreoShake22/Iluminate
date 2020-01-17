import { Component, OnInit } from '@angular/core';
import {rankingservice} from '../services/ranking.service';
import { rankingTask } from "../models/model.interface";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
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
