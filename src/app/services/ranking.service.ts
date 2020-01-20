import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule} from 'angularfire2/firestore'
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators'
import {rankingTask } from "../models/model.interface";

@Injectable({
  providedIn: 'root'
})
export class rankingservice {

  private rankingCOllection : AngularFirestoreCollection<rankingTask>;
  private ranking:Observable<rankingTask[]>;
  private db:AngularFirestore;
  constructor(db:AngularFirestore) {
    this.rankingCOllection= db.collection<rankingTask>('ranking');
    this.db=db;
    this.ranking=this.rankingCOllection.snapshotChanges().pipe(map(
      actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const id = data.id;
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

   getUsuario(id:string){
    this.ranking.forEach(item=>{
      
    })
   }

   addTodo(todo:rankingTask,id:string)
   {
     var salu2=this.rankingCOllection.doc<any>(id);
     salu2.set({
      name: todo.username,
      puntuacionG: todo.puntuacionG,
      puntuacionS: todo.puntuacionS,
      // Other info you want to add here
    })
   }

}
