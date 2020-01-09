import {Component, OnInit} from '@angular/core';
import {TaskI} from '../models/task.interface';
import {TodoService} from '../services/todo.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  todos:TaskI[];

  constructor(private todoService:TodoService) {

    
  }
  ngOnInit()
    {
      this.todoService.getTodos().subscribe(res=>{
        this.todos=res;
      })
    }

  prueba(){
    alert("esto es una prueba de m...");
  }
}
