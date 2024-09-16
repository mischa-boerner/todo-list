import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormsModule} from "@angular/forms";

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
  todoId!: string;
  todoTitle!: string;
  todoDescription!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.todoId = params.get('id')!;
      this.loadTodoItem(this.todoId);
    });
  }

  loadTodoItem(id: string) {
    const savedData = localStorage.getItem('todoItems');
    if (savedData) {
      const todoItems = JSON.parse(savedData);
      const todoItem = todoItems.find((item: {id: string}) => item.id === id);
      if (todoItem) {
        this.todoTitle = todoItem.taskTitle;
        this.todoDescription = todoItem.taskDescription;
      }
    }
  }

  saveChanges() {
    const savedData = localStorage.getItem('todoItems');
    if (savedData) {
      const todoItems = JSON.parse(savedData);
      const todoItem = todoItems.find((item: {id: string}) => item.id === this.todoId);
      if (todoItem) {
        todoItem.taskTitle = this.todoTitle;
        todoItem.taskDescription = this.todoDescription;
        localStorage.setItem('todoItems', JSON.stringify(todoItems));
      }
    }
  }
}
