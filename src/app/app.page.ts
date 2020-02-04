import { Component } from '@angular/core';
import { rankingTask } from "./models/model.interface";


@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class AppPage {
  usuario:rankingTask={
    username:'',
    puntuacionS:0,
    puntuacionG:0,
    ultimaPartida:'',
    lastWeek:0,
    grupos:[]
  };
  name:string='julen';
  imagen:'';

}