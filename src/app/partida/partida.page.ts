import { Component, OnInit, wtfStartTimeRange } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { preguntasservice } from '../services/galderak.service';
import { galderakTask } from "../models/model.interface";
import { rankingservice } from '../services/ranking.service';
import { rankingTask } from "../models/model.interface";
import * as firebase from 'firebase'
@Component({
  selector: 'app-partida',
  templateUrl: './partida.page.html',
  styleUrls: ['./partida.page.scss'],
})
export class PartidaPage implements OnInit {

  index: number = 0;
  disponible: boolean = true;
  correcta: string;
  puntuacion: number = 0;
  respuestas: string[] = [];
  final: string[] = [];
  t: number = 10;
  myRand: number;
  loading;
  ranking: rankingTask;
  colores: string[] = ['Dpurple', 'Dpurple', 'Dpurple'];



  public preguntas = [
    { pregunta: "Cargando preguntas", respuesta: "", respuesta2: "", respuesta3: "" },
  ];

  mix() {
    this.final = [];
    this.correcta = this.preguntas[this.index].respuesta;
    this.respuestas.push(this.preguntas[this.index].respuesta, this.preguntas[this.index].respuesta2, this.preguntas[this.index].respuesta3);
    this.mezclas(this.respuestas);
  }

  respuesta(res: string,c:number) {
    this.disponible = false
    if (this.correcta == res) {
      this.puntuacion += 100 * ((this.t) / 10)
      this.colores[c]='success'
      
    }else{
      this.colores[c]='danger'
    }

    setTimeout(function () {
      this.colores[c]='Dpurple'
      this.updateIndex();
      this.disponible=true
    this.startTimer();
    }.bind(this), 1000)
    
  }

  updateIndex() {
    if (this.index < this.preguntas.length - 1) {
      this.index++;
      this.mix();
      this.t = 10;
    } else {
      this.finalizar();
    }

  }



  getIndex() {
    return this.index;
  }
  constructor(private rankingservice: rankingservice, private loadingController: LoadingController, private navCtrl: NavController, private preguntasservice: preguntasservice) { }

  ngOnInit() {
    this.preguntasservice.getpreguntas().subscribe(res => {
      this.preguntas = res;
      this.filtrarPreguntas();
      this.loadAll();
    });
  }

  pasarPregunta() {


  }

  startTimer() {
    if (this.t > 0) {

      setTimeout(function () {
        this.t--;
        if (this.disponible) {
          this.startTimer()
        }
      }.bind(this), 1000)
    }
    else {
      if (this.index < this.preguntas.length - 1) {
        this.updateIndex();
        this.startTimer();
      } else {
        this.finalizar();
      }

    }
  }

  finalizar() {
    this.navCtrl.navigateForward('/');
    this.ranking.puntuacionG += this.puntuacion
    this.ranking.puntuacionS += this.puntuacion
    this.rankingservice.updatePuntos(this.ranking, firebase.auth().currentUser.uid)
  }

  mezclas(respuestas) {
    while (this.final.length < 3) {
      this.myRand = this.random(respuestas.length);
      this.final.push(respuestas[this.myRand]);
      this.respuestas.splice(this.myRand, 1);
    } this.respuestas = []
  }

  random(tam: number): number {
    let rand = Math.floor(Math.random() * tam);
    return rand;
  }

  async loadAll() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();

    this.mix()
    loading.dismiss();
    this.startTimer();
    this.rankingservice.getTodo(firebase.auth().currentUser.uid).subscribe(res => {
      this.ranking = res;
    })
  }
  filtrarPreguntas() {
    var id: galderakTask[] = [];
    for (var i = 0; i != this.preguntas.length && id.length < 10; i++) {
      this.myRand = this.random(this.preguntas.length);
      id.push(this.preguntas[this.myRand]);
      this.preguntas.splice(this.myRand, 1)
    }
    console.log(id.length)
    this.preguntas = id;
  }
}
