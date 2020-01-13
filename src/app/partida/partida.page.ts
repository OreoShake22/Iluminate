import { Component, OnInit, wtfStartTimeRange } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-partida',
  templateUrl: './partida.page.html',
  styleUrls: ['./partida.page.scss'],
})
export class PartidaPage implements OnInit {

  index:number = 0;

  t:number = 10;

  public preguntas = [
    { pregunta: "pregunta1", respuesta: "1", respuesta2: "2", respuesta3: "3" },
    { pregunta: "pregunta2", respuesta: "1", respuesta2: "2", respuesta3: "3" },
    { pregunta: "pregunta3", respuesta: "1", respuesta2: "2", respuesta3: "3" },
    { pregunta: "pregunta4", respuesta: "1", respuesta2: "2", respuesta3: "3" },
];


updateIndex(){
  if(this.index<this.preguntas.length-1){
    this.index++;
    this.t=10;
  }else{
    this.navCtrl.navigateForward('/inicio');
  }
  
}

getIndex(){
  return this.index;
}
  constructor(private navCtrl: NavController,) { this.startTimer()}

  ngOnInit() {
  }

  startTimer(){
    if(this.t>0){
      setTimeout(function(){
        this.t--;this.startTimer()}.bind(this),1000)
    }
     else {
      if(this.index<this.preguntas.length-1){
        this.updateIndex();
      this.startTimer();
      }else{
        this.navCtrl.navigateForward('/inicio');
      }
      
    }
  }
    

}
