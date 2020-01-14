import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule} from 'angularfire2/firestore'
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators'
import {rankingTask } from "../models/rankingTask.interface";

@Injectable({
  providedIn: 'root'
})
export class rankingservice {

  private rankingCOllection : AngularFirestoreCollection<rankingTask>;
  private ranking:Observable<rankingTask[]>;
  constructor(db:AngularFirestore) {
    this.rankingCOllection= db.collection<rankingTask>('ranking');
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

   addTodo(todo:rankingTask)
   {
     return this.rankingCOllection.add(todo)
   }

}
