import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {Todo} from "../../interfaces/todo";
import {TodoService} from "../../service/todo.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.scss'
})
export class TodoDetailComponent implements OnInit{
  todo: Todo = {
    id: '',
    taskTitle: '',
    taskDescription: '',
    isCompleted: false
  };
  todoId!: string;

  constructor(private route: ActivatedRoute, private todoService: TodoService, private _location: Location) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.todoId = params.get('id')!;
      this.loadTodoItem(this.todoId);
    });
  }

  loadTodoItem(id: string) {
    this.todoService.getTodoById(id).subscribe(todoItem => {
      this.todo = todoItem;
    });
  }

  saveChanges() {
    const updatedTodo: Todo = {
      id: this.todo.id,
      taskTitle: this.todo.taskTitle,
      taskDescription: this.todo.taskDescription,
      isCompleted: this.todo.isCompleted
    };
    this.todoService.putTodos(updatedTodo).subscribe();
  }

  completeTask() {
    this.todo.isCompleted = !this.todo.isCompleted;
    this.saveChanges();
  }

  goBack() {
    this._location.back()
  }
}
