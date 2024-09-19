import {Component, ElementRef, EventEmitter, HostListener, inject, Output, ViewChild} from '@angular/core';
import {Todo} from "../../../interfaces/todo";
import {FormsModule} from "@angular/forms";
import {TodoService} from "../../../service/todo.service";

@Component({
  selector: 'app-todo-header-search',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './todo-header-search.component.html',
  styleUrl: './todo-header-search.component.scss'
})
export class TodoHeaderSearchComponent {
  @ViewChild('searchInput', {
    static: true
  }) searchInput!: ElementRef;

  private todoService: TodoService = inject(TodoService);

  @Output() searchTodo = new EventEmitter<Todo[]>();
  searchInputText: string = '';

  searchResult: Todo[] = [];
  includeDesc: boolean = false;

  search() {
    if(!this.searchInputText.trim()) {
      this.searchResult = [];
      this.searchInputText = '';
      this.searchTodo.emit(this.searchResult);
      return;
    }

    this.todoService.getTodos().subscribe(todos => {
      console.log(todos);

      if(this.includeDesc) {
        this.searchResult = todos.filter(todo =>
          todo.taskTitle.toLowerCase().includes(this.searchInputText.toLowerCase()) || todo.taskDescription.toLowerCase().includes(this.searchInputText.toLowerCase())
        ).sort((a, b) => {
          if (a.isCompleted === b.isCompleted) {
            return b.importance - a.importance;
          }
          return a.isCompleted ? 1 : -1;
        });
      } else {
        this.searchResult = todos.filter(todo =>
          todo.taskTitle.toLowerCase().includes(this.searchInputText.toLowerCase())
        ).sort((a, b) => {
          if (a.isCompleted === b.isCompleted) {
            return b.importance - a.importance;
          }
          return a.isCompleted ? 1 : -1;
        });
      }

      if(this.searchResult.length === 0) {
        this.searchInputText = `Nothing found for "${this.searchInputText}"`
      }

      this.searchTodo.emit(this.searchResult);
    });
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    this.searchInputText = '';
    this.search();
  }

  @HostListener('document:keydown.enter', ['$event'])
  handleEnterKey(event: KeyboardEvent) {
    if (document.activeElement === this.searchInput.nativeElement) {
      this.search();
    }
  }
}
