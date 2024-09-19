import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {TodoService} from "../../../service/todo.service";
import {FormsModule} from "@angular/forms";
import {MatTooltip, MatTooltipModule} from '@angular/material/tooltip';
import {Todo} from "../../../interfaces/todo";

@Component({
  selector: 'app-todo-status',
  standalone: true,
  imports: [
    FormsModule,
    MatTooltip
  ],
  templateUrl: './todo-status.component.html',
  styleUrl: './todo-status.component.scss'
})
export class TodoStatusComponent implements OnInit{
  private todoService: TodoService = inject(TodoService);

  @Output() scroll = new EventEmitter<string>();

  totalTodos: number = 0;
  urgentTodos: number = 0;
  importantTodos: number = 0;
  normalTodos: number = 0;
  completedTodos: number = 0;

  ngOnInit() {
    this.getTodoAmount()
    this.todoService.todoUpdate$.subscribe(() => {
      this.getTodoAmount();
    })
  }

  getTodoAmount() {
    this.todoService.getTodos().subscribe(todos => {
      this.totalTodos = todos.length;
      this.urgentTodos = todos.filter(todo => !todo.isCompleted && todo.importance === 2).length;
      this.importantTodos = todos.filter(todo => !todo.isCompleted && todo.importance === 1).length;
      this.normalTodos = todos.filter(todo => !todo.isCompleted && todo.importance === 0).length;
      this.completedTodos = todos.filter(todo => todo.isCompleted).length;
    });
  }

  doScroll(str: string) {
    this.scroll.emit('string');
  }

}
