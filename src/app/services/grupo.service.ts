import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule } from 'angularfire2/firestore'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { groupTask } from "../models/model.interface";

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  private groupCollection: AngularFirestoreCollection<groupTask>;
  private group: Observable<groupTask[]>;


  private db: AngularFirestore;
  constructor(db: AngularFirestore) {

    this.groupCollection = db.collection<groupTask>('grupo');
    this.db = db;
    this.group = this.groupCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
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

 
   updateGrupo(grupo:groupTask,id:string){
    return this.groupCollection.doc(id).update(grupo);
   }

   addGroup(grupo:groupTask)
   {
    var id=this.db.createId()
    var salu2=this.groupCollection.doc<any>(id);
     salu2.set({
      nombre: grupo.nombre,
      contraseña: grupo.contra,
      usuarios: grupo.usuarios,
      creador:grupo.creador,
    })
    return id;
   }


}
