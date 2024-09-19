import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {NgIf} from "@angular/common";
import {TodoService} from "../../../service/todo.service";
import {Todo} from "../../../interfaces/todo";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-card-seperator',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './card-seperator.component.html',
  styleUrl: './card-seperator.component.scss'
})
export class CardSeperatorComponent {
  @Input() todos: Todo[] = [];
  @Input() importanceLabel: string = '';
  @Input() importance: number = 0;
  @Input() showAll: boolean = false;

  @Output() update = new EventEmitter<void>();
  @Output() toggleShow = new EventEmitter<boolean>();

  constructor(private todoService: TodoService) {}

  checkSelected(): boolean {
    return this.todos.filter(todo => todo.isSelected).length != 0;
  }

  getSelectedLength(): number {
    return this.todos.filter(todo => todo.isSelected).length;
  }

  selectAll() {
    const selectRequests = this.todos.filter(todo => !todo.isSelected).map(todo => {
      todo.isSelected = true;
      return this.todoService.putTodos(todo);
    });

    forkJoin(selectRequests).subscribe(() => {
      this.update.emit();
    });
  }

  unselectAll() {
    const unselectRequests = this.todos.filter(todo => todo.isSelected).map(todo => {
      todo.isSelected = false;
      return this.todoService.putTodos(todo);
    });

    forkJoin(unselectRequests).subscribe(() => {
      this.update.emit();
    });
  }

  completeAllSelected() {
    this.todos.filter(todo => todo.isSelected).forEach(todo => {
      todo.isCompleted = true;
      todo.isSelected = false;
      this.todoService.putTodos(todo).subscribe();
    });
    this.update.emit();
  }

  moveSelectedUp() {
    this.todos.filter(todo => todo.isSelected).forEach(todo => {
      todo.importance = todo.importance + 1;
      todo.isSelected = false;
      this.todoService.putTodos(todo).subscribe();
    });
    this.update.emit();
  }

  moveSelectedDown() {
    this.todos.filter(todo => todo.isSelected).forEach(todo => {
      todo.importance = todo.importance - 1;
      todo.isSelected = false;
      this.todoService.putTodos(todo).subscribe();
    });
    this.update.emit();
  }

  toggleShowAll(show: boolean) {
    this.toggleShow.emit(show);
  }

  deleteAllSelected() {
    const selectedTodos = this.todos.filter(todo => todo.isSelected);
    const deleteRequests = selectedTodos.map(todo => this.todoService.deleteTodo(todo.id));
    forkJoin(deleteRequests).subscribe(() => {
      this.update.emit();
    });
  }

  deleteAll() {
    const deleteRequests = this.todos.map(todo => this.todoService.deleteTodo(todo.id));
    forkJoin(deleteRequests).subscribe(() => {
      this.update.emit();
    });
  }
}
