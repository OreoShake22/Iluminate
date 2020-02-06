import { Component, OnInit } from '@angular/core';
import { galderakTask } from "../models/model.interface";
import { preguntasservice } from '../services/galderak.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';
@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.page.html',
  styleUrls: ['./todo-details.page.scss'],
})
export class todoDetailsPage implements OnInit {
  galderak: galderakTask = {
    categoria: '',
    imagen: '',
    pregunta: '',
    respuesta: '',
    respuesta2: '',
    respuesta3: '',
  };
  inputvalue: string = '';


  constructor(private preguntasservice: preguntasservice, private nav: NavController) { }

  ngOnInit() {
  }
  guardar() {
    this.galderak.pregunta = ((document.getElementById("pregunta") as HTMLInputElement).value);
    this.galderak.respuesta = ((document.getElementById("respuesta") as HTMLInputElement).value);
    this.galderak.respuesta2 = ((document.getElementById("respuesta2") as HTMLInputElement).value);
    this.galderak.respuesta3 = ((document.getElementById("respuesta3") as HTMLInputElement).value);
    this.preguntasservice.addpreguntas(this.galderak)
    this.galderak.respuesta3 = ((document.getElementById("pregunta") as HTMLInputElement).value = "");
    this.galderak.respuesta3 = ((document.getElementById("respuesta") as HTMLInputElement).value = "");
    this.galderak.respuesta3 = ((document.getElementById("respuesta2") as HTMLInputElement).value = "");
    this.galderak.respuesta3 = ((document.getElementById("respuesta3") as HTMLInputElement).value = "");
  }
}