import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule} from 'angularfire2/firestore'
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators'
import {TaskI} from '../models/task.interface'

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todosCOllection : AngularFirestoreCollection<TaskI>;
  private todos:Observable<TaskI[]>;
  constructor(db:AngularFirestore) {
    this.todosCOllection= db.collection<TaskI>('todos');
    this.todos=this.todosCOllection.snapshotChanges().pipe(map(
      actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return{id, ...data};
        });

      }
    ));

   }
   
   getTodos()
   {
     return this.todos;
   }
   getTodo(id:string)
   {
     return this.todosCOllection.doc<TaskI>(id).valueChanges();
     
   }

   addTodo(todo:TaskI)
   {
     return this.todosCOllection.add(todo)
   }

}
