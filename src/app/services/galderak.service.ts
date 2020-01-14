import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule} from 'angularfire2/firestore'
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators'
import {galderakTask } from "../models/model.interface";

@Injectable({
  providedIn: 'root'
})
export class preguntasservice {

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
   
   addpreguntas(pregunta:galderakTask)
   {
     return this.preguntasCOllection.add(pregunta)
   }

}
