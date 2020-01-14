import { Component, OnInit, wtfStartTimeRange } from '@angular/core';
import { NavController } from '@ionic/angular';

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


  public preguntas = [
    { pregunta: "pregunta1", respuesta: "1", respuesta2: "2", respuesta3: "3" },
    { pregunta: "pregunta2", respuesta: "1", respuesta2: "2", respuesta3: "3" },
    { pregunta: "pregunta3", respuesta: "1", respuesta2: "2", respuesta3: "3" },
    { pregunta: "pregunta4", respuesta: "1", respuesta2: "2", respuesta3: "3" },
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
      this.navCtrl.navigateForward('/inicio');
    }

  }

  getIndex() {
    return this.index;
  }
  constructor(private navCtrl: NavController) { this.mix(), this.startTimer() }

  ngOnInit() {

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
        this.navCtrl.navigateForward('/inicio');
      }

    }
  }

  mezclas(respuestas) {
    for (var i = 0; i != respuestas.length; i++) {
      for (var a = 0; respuestas.length != this.final.length; a++) {
        this.astolfo = true;
        this.myRand = this.random();
        if (respuestas[this.myRand] == this.final[a]) {
          this.astolfo = false;
          i--;
          break;
        }
        if (this.astolfo && this.respuestas[this.myRand] != null) {
          this.final.push(respuestas[this.myRand]);
          this.respuestas.splice(this.myRand, 1);
        }
      }
    } this.respuestas = []
  }

  random(): number {
    let rand = Math.floor(Math.random() * 3);
    return rand;
  }

}
