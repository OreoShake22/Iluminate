import { Component, OnInit } from '@angular/core';
import {preguntasservice} from '../services/galderak.service';
import { galderakTask } from "../models/model.interface";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  preguntas:galderakTask[];

  constructor(private preguntasservice:preguntasservice) {
    
    
  }
  ngOnInit()
    {
      this.preguntasservice.getpreguntas().subscribe(res=>{
        this.preguntas=res;
        console.log('preguntas',res)
      })
      
    }

  
}
