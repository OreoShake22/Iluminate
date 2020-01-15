import {Component, OnInit} from '@angular/core';
import { rankingTask } from "../models/model.interface";
import {rankingservice} from '../services/ranking.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
  
})
export class Tab1Page implements OnInit{

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
