import { Component, OnInit } from '@angular/core';
import {rankingservice} from '../services/ranking.service';
import { rankingTask } from "../models/model.interface";
import { TimeService } from '../services/time.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  dia:any;
  constructor( public timeServices:TimeService) {
  }
  ngOnInit()
    {
      
    }
  
    getPosts() { //llamamos a la funcion getPost de nuestro servicio.
      this.timeServices.getHour()
      .then(data => {
        this.dia = data;
        data=this.dia.substring(0,this.dia.indexOf("T"));
        console.log(data)
      });
    }
}
