import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule} from 'angularfire2/firestore'
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators'
import {rankingTask } from "../models/model.interface";

@Injectable()
export class UsuarioService {
  private rankingCOllection : AngularFirestoreCollection<rankingTask>;
  private ranking:Observable<rankingTask[]>;
  user:rankingTask={
    username:'',
    puntuacionS:0,
    puntuacionG:0,
    ultimaPartida:'0',
    grupos:[]
  };
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

   getUsuario(id:string){

    return this.rankingCOllection.doc<rankingTask>(id).valueChanges();
   }
}
