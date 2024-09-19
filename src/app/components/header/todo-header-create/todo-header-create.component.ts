import {Component, ElementRef, EventEmitter, HostListener, inject, Output, ViewChild} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Todo} from "../../../interfaces/todo";
import { v4 as uuidv4 } from 'uuid';
import {TodoService} from "../../../service/todo.service";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-todo-header-create',
  standalone: true,
  imports: [
    FormsModule,
    NgClass
  ],
  templateUrl: './todo-header-create.component.html',
  styleUrl: './todo-header-create.component.scss'
})
export class TodoHeaderCreateComponent {
  @ViewChild('taskTitleInput', {
    static: true
  }) taskTitleInput!: ElementRef;

  private todoService: TodoService = inject(TodoService);

  @Output() createTodo = new EventEmitter<Todo>();
  taskTitleInputText: string = '';
  taskImportance: number = 0;

  addTodo() {
    if(this.taskTitleInputText.trim()) {
      const newTodo: Todo = {
        id: uuidv4(),
        taskTitle: this.taskTitleInputText,
        taskDescription: '',
        isCompleted: false,
        importance: this.taskImportance
      }

      this.todoService.postTodos(newTodo).subscribe(() => {
        this.createTodo.emit(newTodo);
        this.taskTitleInputText = '';
        this.taskImportance = 0;
      });

    }
  }

  setImportance(n: number) {
    this.taskImportance = n;
  }

  checkImportance(n: number) {
    return n === this.taskImportance;
  }

  @HostListener('document:keydown.enter', ['$event'])
  handleEnterKey(event: KeyboardEvent) {
    if (document.activeElement === this.taskTitleInput.nativeElement) {
      this.addTodo();
    }
  }
}
