import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule} from 'angularfire2/firestore'
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators'
import {galderakTask } from "../models/model.interface";

@Injectable({
  providedIn: 'root'
})
export class preguntasservice {
  public returnable = [
    { pregunta: "", respuesta: "", respuesta2: "", respuesta3: "" },
  ];
  private preguntasCOllection : AngularFirestoreCollection<galderakTask>;
  private preguntas:Observable<galderakTask[]>;
  constructor(db:AngularFirestore) {
    this.preguntasCOllection= db.collection<galderakTask>('preguntas');
    this.preguntas=this.preguntasCOllection.snapshotChanges().pipe(map(
      actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return{id, ...data};
        });

      }
    ));

   }
   
   getpreguntas()
   {
     return this.preguntas;
   }

   mezclador(){
    return this.preguntas
   }
   
   addpreguntas(pregunta:galderakTask)
   {
     return this.preguntasCOllection.add(pregunta)
   }

   random(tam: number): number {
    let rand = Math.floor(Math.random() * tam);
    return rand;
  }

  shake(r:string){
    this.loadPregunta(r).subscribe(k=>{
      this.returnable.push(k)
    })
  }

  loadPregunta(id:string){
    console.log(id)
    return this.preguntasCOllection.doc<galderakTask>(id).valueChanges();
   }

}
