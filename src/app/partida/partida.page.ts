import { Component, OnInit, wtfStartTimeRange } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { preguntasservice } from '../services/galderak.service';
import { galderakTask } from "../models/model.interface";
import { rankingservice } from '../services/ranking.service';
import { rankingTask } from "../models/model.interface";
import * as firebase from 'firebase'
import { SmartAudioService } from '../smart-audio.service';
import { TimeService } from '../services/time.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-partida',
  templateUrl: './partida.page.html',
  styleUrls: ['./partida.page.scss'],
})
export class PartidaPage{
  temporalizador:any;
  categoria:string;
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
  smartAudioService:any;


  public preguntas = [
    { categoria:'',imagen:'',pregunta: "Cargando preguntas", respuesta: "", respuesta2: "", respuesta3: "" },
  ];

  mix() {
    this.final = [];
    this.correcta = this.preguntas[this.index].respuesta;
    this.respuestas.push(this.preguntas[this.index].respuesta, this.preguntas[this.index].respuesta2, this.preguntas[this.index].respuesta3);
    this.mezclas(this.respuestas);
  }

  respuesta(res: string,c:number) {
    if(this.disponible){
    this.disponible = false
    if (this.correcta == res) {
      this.smartAudioService.play('acierto');
      this.puntuacion += 100 * ((this.t) / 10)
      this.colores[c]='success'
      
    }else{
      this.smartAudioService.play('fallo');
      this.colores[c]='danger'
    }

    setTimeout(function () {
      this.colores[c]='Dpurple'
      this.updateIndex();
      
      if (this.index < this.preguntas.length) {
      this.disponible=true
      }
    this.startTimer();
    }.bind(this), 1000)
  }
  }

  updateIndex() {
    if (this.index < this.preguntas.length - 1) {
      this.index++;
      this.mix();
      this.t = 10;
    } else {
      this.disponible=false;
      this.finalizar();
    }

  }



  getIndex() {
    return this.index;
  }
  constructor(private http: HttpClient,private rankingservice: rankingservice, public timeServices: TimeService, private loadingController: LoadingController, private navCtrl: NavController, private preguntasservice: preguntasservice,
    smartAudioService: SmartAudioService) {
      smartAudioService.preload('acierto', 'assets/audio/acierto.mp3');
      smartAudioService.preload('fallo', 'assets/audio/muelle.mp3');
      this.smartAudioService=smartAudioService
     }

  ionViewWillEnter() {
    this.timeServices.getHour()
      .then(data => {
        var semana;
        semana=data['day_of_week'];
        this.http.get('../assets/json/categoria.json').subscribe(data => {
          
          data['semana'].forEach(cat => {
            if (cat.day_of_week == semana) {
              this.categoria=cat.categoria;
              
              
            }
          })
        });
    this.preguntasservice.getpreguntas().subscribe(res => {
      this.preguntas = res;
      this.filtrarPreguntas();
      this.loadAll();
    });
  })
  }

  ionViewWillLeave(){
     clearInterval(this.temporalizador)
  }

  startTimer() {
    if (this.t > 0) {

      this.temporalizador=setTimeout(function () {
        if (this.disponible) {
          this.t--;
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
    this.disponible=false;
    this.navCtrl.navigateForward('/');
    this.ranking.puntuacionG += this.puntuacion
    this.ranking.puntuacionS += this.puntuacion
    this.rankingservice.updateTodo(this.ranking, firebase.auth().currentUser.uid)
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
    var semanales:galderakTask[] = [];
    for (var i = 0; i < this.preguntas.length; i++) {
      if(this.preguntas[i].categoria==this.categoria){
        semanales.push(this.preguntas[i]);
        console.log(this.preguntas[i].pregunta+" "+i)
        this.preguntas.splice(i, 1)
        i--;
      }
    }

    for (var i = 0; i < semanales.length && id.length < 5; i++) {
      this.myRand = this.random(semanales.length);
      id.push(semanales[this.myRand]);
      semanales.splice(this.myRand, 1)
      i--;
    }

    for (var i = 0;id.length < 10; i++) {
      this.myRand = this.random(this.preguntas.length);
      id.push(this.preguntas[this.myRand]);
      this.preguntas.splice(this.myRand, 1)
      i--;
    }
    console.log(id.length)
    this.preguntas = id;
  }

  
}
