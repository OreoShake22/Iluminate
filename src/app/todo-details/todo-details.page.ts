import { Component, OnInit } from '@angular/core';
import {TaskI} from '../models/task.interface';
import {TodoService} from '../services/todo.service';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';
@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.page.html',
  styleUrls: ['./todo-details.page.scss'],
})
export class TodoDetailsPage implements OnInit {
  todo:TaskI={
    nombre:''
  };
  inputvalue:string='';


  constructor(private todoService:TodoService,private nav:NavController) { }

  ngOnInit() {
  }
  guardar(){
    this.todo.nombre=((document.getElementById("text") as HTMLInputElement).value);
    this.todoService.addTodo(this.todo).then(() =>{
      this.nav.navigateForward('/')
    })
}
}