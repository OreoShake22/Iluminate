import { Component, OnInit, wtfStartTimeRange } from '@angular/core';
import { NavController,LoadingController } from '@ionic/angular';
import {preguntasservice} from '../services/galderak.service';
import { galderakTask } from "../models/model.interface";
import {rankingservice} from '../services/ranking.service';
import * as firebase from 'firebase'
@Component({
  selector: 'app-partida',
  templateUrl: './partida.page.html',
  styleUrls: ['./partida.page.scss'],
})
export class PartidaPage implements OnInit {

  index: number = 0;
  correcta:string;
  puntuacion:number =0;
  respuestas: string[] = [];
  final: string[] = [];
  t: number = 10;
  myRand: number;
  loading;

  

  public preguntas = [
    { pregunta: "Cargando preguntas", respuesta: "", respuesta2: "", respuesta3: "" },
  ];

  mix() {
    this.final = [];
    this.correcta=this.preguntas[this.index].respuesta;
    this.respuestas.push(this.preguntas[this.index].respuesta, this.preguntas[this.index].respuesta2, this.preguntas[this.index].respuesta3);
    this.mezclas(this.respuestas);
  }

  respuesta(res:string){
    if(this.correcta==res){
      this.puntuacion+=100*((this.t)/10)
    }
    this.updateIndex();
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
  constructor(private rankingservice:rankingservice,private loadingController: LoadingController, private navCtrl: NavController,private preguntasservice:preguntasservice) {  }

  ngOnInit() {
    this.preguntasservice.getpreguntas().subscribe(res=>{
      this.preguntas=res;
      this.filtrarPreguntas();
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
        this.rankingservice.updatePuntos(this.puntuacion,firebase.auth().currentUser.uid)
      }

    }
  }

  mezclas(respuestas) {
    while (this.final.length<3) {
        this.myRand = this.random(respuestas.length);
          this.final.push(respuestas[this.myRand]);
          this.respuestas.splice(this.myRand, 1);
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
  filtrarPreguntas(){
    var id:galderakTask[]=[];
    for (var i = 0; i != this.preguntas.length && id.length<10; i++) {
        this.myRand = this.random(this.preguntas.length);
          id.push(this.preguntas[this.myRand]);
          this.preguntas.splice(this.myRand,1)
    }
    console.log(id.length)
    this.preguntas=id;
  }
}
