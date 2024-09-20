import {Component, ElementRef, HostListener, inject, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {TodoItemComponent} from "../todo-item/todo-item.component";
import { v4 as uuidv4 } from 'uuid';
import {TodoService} from "../../../service/todo.service";
import {Todo} from "../../../interfaces/todo";
import {forkJoin} from "rxjs";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {TodoHeaderComponent} from "../../header/todo-header/todo-header.component";
import {LoadingComponent} from "../../loading/loading.component";
import {ImportanceCardPipe} from "../../../pipes/importance-card.pipe";
import {CardSeperatorComponent} from "../../card/card-seperator/card-seperator.component";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    TodoItemComponent,
    NgIf,
    TodoHeaderComponent,
    NgForOf,
    LoadingComponent,
    ImportanceCardPipe,
    NgClass,
    CardSeperatorComponent
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit{
  @ViewChild('todoListContainer', {
    read: ViewContainerRef,
    static: true
  }) container!: ViewContainerRef;

  @ViewChild('taskInput', {
    static: true
  }) taskInput!: ElementRef;

  @ViewChild('searchInput', {
    static: true
  }) searchInput!: ElementRef;

  private todoService: TodoService = inject(TodoService);
  todos: Todo[] = [];
  completedTodos: Todo[] = [];

  urgentTodos: Todo[] = [];
  importantTodos: Todo[] = [];
  normalTodos: Todo[] = [];

  completedUrgentTodos: Todo[] = [];
  completedImportantTodos: Todo[] = [];
  completedNormalTodos: Todo[] = [];

  searchResult: Todo[] = [];
  completedSearchResult: Todo[] = [];

  deletedTodos: Todo[] = [];

  showCompleted = false;

  ngOnInit() {
    this.loadData();
  }

  update() {
    this.loadData()
  }

  loadData() {
    this.todoService.getTodos().subscribe(todo => {
      console.log(todo);
      // this.todos = todo.filter(todo => !todo.isCompleted);
      this.todos = todo.filter(todo => !todo.isCompleted).sort((a, b) => b.importance - a.importance);
      this.completedTodos = todo.filter(todo => todo.isCompleted).sort((a, b) => b.importance - a.importance);

      this.urgentTodos = this.todos.filter(todo => todo.importance === 2);
      this.importantTodos = this.todos.filter(todo => todo.importance === 1);
      this.normalTodos = this.todos.filter(todo => todo.importance === 0);

      this.completedUrgentTodos = this.completedTodos.filter(todo => todo.importance === 2);
      this.completedImportantTodos = this.completedTodos.filter(todo => todo.importance === 1);
      this.completedNormalTodos = this.completedTodos.filter(todo => todo.importance === 0);
    });
  }

  onSearchTodo(searchResult: Todo[]) {
    this.searchResult = searchResult.filter(todo => !todo.isCompleted).sort((a, b) => b.importance - a.importance);
    this.completedSearchResult = searchResult.filter(todo => todo.isCompleted).sort((a, b) => b.importance - a.importance);
    this.loadData();
  }

  showCompletedTasks() {
    this.showCompleted = !this.showCompleted;
  }

  deleteCompletedTodos() {
    this.deletedTodos = [...this.completedTodos];
    const deleteRequests = this.completedTodos.map(todo => this.todoService.deleteTodo(todo.id));
    forkJoin(deleteRequests).subscribe(() => {
      this.loadData();
    });
  }

  undoDelete() {
    const restoreRequests = this.deletedTodos.map(todo => this.todoService.postTodos(todo));
    forkJoin(restoreRequests).subscribe(() => {
      this.deletedTodos = []; // Clear the deleted tasks after restoring
      this.loadData();
    });
  }

  trackById(index: number, item: Todo): string {
    return item.id;
  }
}
