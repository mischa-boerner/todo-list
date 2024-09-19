import {Component, EventEmitter, HostListener, inject, Input, Output} from '@angular/core';
import {Todo} from "../../../interfaces/todo";
import {Router} from "@angular/router";
import {ImportanceCardPipe} from "../../../pipes/importance-card.pipe";
import {TodoService} from "../../../service/todo.service";
import {NgClass, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [
    ImportanceCardPipe,
    NgClass,
    NgIf,
    FormsModule
  ],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss'
})
export class TodoCardComponent {
  private todoService: TodoService = inject(TodoService);

  @Input() todo!: Todo;
  @Output() update = new EventEmitter<void>();

  constructor(private router: Router) {}

  updateTodoItem() {
    if (this.todo) {
      this.todoService.putTodos(this.todo).subscribe(updatedTodo => {
        console.log('Todo updated:', updatedTodo);
        this.update.emit();
      });
    }
  }

  changeCompleted() {
    this.todo.isCompleted = !this.todo.isCompleted;
    this.todo.isSelected = false;
    this.updateTodoItem()
  }

  changeImportance(n: number) {
    this.todo.importance = n;
    this.updateTodoItem()
  }

  deleteTodo() {
    this.todoService.deleteTodo(this.todo.id).subscribe(deletedTodo => {
      this.update.emit();
    })
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    if (event.shiftKey && event.button === 0) {
      this.todo.isSelected = !this.todo.isSelected;
      this.todoService.putTodos(this.todo).subscribe(() => {
        this.update.emit();
      })
    }
  }
}
