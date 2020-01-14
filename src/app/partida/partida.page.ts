import { Component, OnInit, wtfStartTimeRange } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-partida',
  templateUrl: './partida.page.html',
  styleUrls: ['./partida.page.scss'],
})
export class PartidaPage implements OnInit {

  index:number = 0;
  respuestas:string[]=[];
  final:string[]=[];
  t:number = 10;

  public preguntas = [
    { pregunta: "pregunta1", respuesta: "1", respuesta2: "2", respuesta3: "3" },
    { pregunta: "pregunta2", respuesta: "1", respuesta2: "2", respuesta3: "3" },
    { pregunta: "pregunta3", respuesta: "1", respuesta2: "2", respuesta3: "3" },
    { pregunta: "pregunta4", respuesta: "1", respuesta2: "2", respuesta3: "3" },
];

mix(){
  this.respuestas.push(this.preguntas[this.index].respuesta,this.preguntas[this.index].respuesta2,this.preguntas[this.index].respuesta3);
  this.mezclas(this.respuestas);
}

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
  constructor(private navCtrl: NavController) { this.startTimer()}

  ngOnInit() {
    
  }

  startTimer(){
    if(this.t>0){
      this.mix();
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
    
  mezclas(respuestas){
    for(var i=0;i<respuestas.length;i++){
      for(var a=0;a<this.final.length;){
        if(respuestas[i]==this.final[a]){
          break;
        }else{
          this.final.push(respuestas[i]);
          console.log(respuestas[i])
        }
      }
    }
  }

}
