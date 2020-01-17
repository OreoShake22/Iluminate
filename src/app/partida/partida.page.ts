import { Component, OnInit, wtfStartTimeRange } from '@angular/core';
import { NavController,LoadingController } from '@ionic/angular';
import {preguntasservice} from '../services/galderak.service';
import { galderakTask } from "../models/model.interface";

@Component({
  selector: 'app-partida',
  templateUrl: './partida.page.html',
  styleUrls: ['./partida.page.scss'],
})
export class PartidaPage implements OnInit {

  index: number = 0;
  respuestas: string[] = [];
  final: string[] = [];
  t: number = 10;
  myRand: number;
  astolfo: boolean;
  loading;

  

  public preguntas = [
    { pregunta: "Cargando preguntas", respuesta: "", respuesta2: "", respuesta3: "" },
  ];

  mix() {
    this.final = [];
    this.respuestas.push(this.preguntas[this.index].respuesta, this.preguntas[this.index].respuesta2, this.preguntas[this.index].respuesta3);
    this.mezclas(this.respuestas);
  }

  updateIndex() {
    if (this.index < this.preguntas.length - 1) {
      this.index++;
      this.mix();
      this.t = 10;
    } else {
      this.navCtrl.navigateForward('/');
    }

  }

  getIndex() {
    return this.index;
  }
  constructor(private loadingController: LoadingController, private navCtrl: NavController,private preguntasservice:preguntasservice) {  }

  ngOnInit() {
    this.preguntasservice.getpreguntas().subscribe(res=>{
      this.preguntas=res;
      this.loadAll();
    });
    
  }

  startTimer() {
    if (this.t > 0) {

      setTimeout(function () {
        this.t--; this.startTimer()
      }.bind(this), 1000)
    }
    else {
      if (this.index < this.preguntas.length - 1) {
        this.updateIndex();
        this.startTimer();
      } else {
        this.navCtrl.navigateForward('/');
      }

    }
  }

  mezclas(respuestas) {
    for (var i = 0; i != respuestas.length; i++) {
      for (var a = 0; respuestas.length != this.final.length; a++) {
        this.astolfo = true;
        this.myRand = this.random(respuestas.length);
        if (respuestas[this.myRand] == this.final[a]) {
          this.astolfo = false;
          i--;
          break;
        }
        if (this.astolfo) {
          this.final.push(respuestas[this.myRand]);
          this.respuestas.splice(this.myRand, 1);
        }
      }
    } this.respuestas = []
  }

  random(tam: number): number {
    let rand = Math.floor(Math.random() * tam);
    return rand;
  }

  async loadAll(){
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
      this.mix()
      loading.dismiss();
      this.startTimer();
}
}
