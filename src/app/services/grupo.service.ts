import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule } from 'angularfire2/firestore'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { groupTask } from "../models/model.interface";
import { groupRelTask } from "../models/model.interface";

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  private groupCollection: AngularFirestoreCollection<groupTask>;
  private group: Observable<groupTask[]>;

  private groupRelCollection: AngularFirestoreCollection<groupRelTask>;
  private groupRel: Observable<groupRelTask[]>;

  private db: AngularFirestore;
  constructor(db: AngularFirestore) {

    this.groupCollection = db.collection<groupTask>('grupo');
    this.db = db;
    this.group = this.groupCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = data.id;
          return { id, ...data };
        });
      }
    ));
    
    this.groupRelCollection = db.collection<groupRelTask>('relacionGrupos')
    this.db = db;
    this.groupRel = this.groupRelCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = data.id;
          return { id, ...data };
        });
      }
    ));
  }

  getgrupos()
  {
    return this.group;
  }

  // filtro(){
  //   var query = this.db.collection<groupRelTask>('relacionGrupos', ref => ref.where('idUser','==',firebase.auth().currentUser.uid));
  //   return query
  // }

  getGrupo(id:string)
  {
    return this.groupCollection.doc<groupTask>(id).valueChanges();
  }

  addUsuario(grupo:groupTask,id:string)
   {
     var a=this.groupCollection.doc<any>(id);
     a.set({
       

    })
   }

   updateGrupo(grupo:groupTask,id:string){
    return this.groupCollection.doc(grupo.id).update(grupo);
   }

}
