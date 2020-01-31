import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule} from 'angularfire2/firestore'
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators'
import {rankingTask } from "../models/model.interface";

@Injectable()
export class rankingservice {

  private rankingCOllection : AngularFirestoreCollection<rankingTask>;
  private ranking:Observable<rankingTask[]>;
  usuario:rankingTask[];
  private db:AngularFirestore;
  constructor(db:AngularFirestore) {
    this.rankingCOllection= db.collection<rankingTask>('ranking', ref => ref.orderBy('puntuacionS', 'desc'));
    
    this.db=db;
    this.ranking=this.rankingCOllection.snapshotChanges().pipe(map(
      actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return{id, ...data};
        });

      }
    ));

   }
   
   getranking()
   {
     return this.ranking;
   }
   getTodo(id:string)
   {
     return this.rankingCOllection.doc<rankingTask>(id).valueChanges();
   }

   addTodo(todo:rankingTask,id:string)
   {
     var salu2=this.rankingCOllection.doc<any>(id);
     salu2.set({
      username: todo.username,
      puntuacionG: todo.puntuacionG,
      puntuacionS: todo.puntuacionS,
      ultimaPartida:todo.ultimaPartida,
      grupos:todo.grupos,
      // Other info you want to add here
    })
   }

   updateTime(ranking:rankingTask,id:string){
    return this.rankingCOllection.doc(id).update({
      ultimaPartida:ranking.ultimaPartida
    });
   }

   updatePuntos(user:rankingTask,id:string){
    return this.rankingCOllection.doc(id).update(user);
   }


   añadirGrupo(usuario,id:string)
   {
    return this.rankingCOllection.doc(id).update(usuario);
   }

}
