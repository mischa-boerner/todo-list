import {Component, ElementRef, HostListener, inject, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {TodoItemComponent} from "../todo-item/todo-item.component";
import { v4 as uuidv4 } from 'uuid';
import {TodoService} from "../../../service/todo.service";
import {Todo} from "../../../interfaces/todo";
import {forkJoin} from "rxjs";
import {NgForOf, NgIf} from "@angular/common";
import {TodoHeaderComponent} from "../../header/todo-header/todo-header.component";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    TodoItemComponent,
    NgIf,
    TodoHeaderComponent,
    NgForOf
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

  searchResult: Todo[] = [];
  completedSearchResult: Todo[] = [];

  deletedTodos: Todo[] = [];

  showCompleted = false;

  ngOnInit() {
    this.loadData();
  }

  updateTodoItem(todo: Todo, isCompleted: boolean) {
    const item = this.todos.find(item => item.id === todo.id) || this.completedTodos.find(item => item.id === todo.id);
    if (item) {
      item.isCompleted = isCompleted;
      this.todoService.putTodos(item).subscribe(updatedTodo => {
        console.log('Todo updated:', updatedTodo);
        this.loadData();
      });
    }
  }

  loadData() {
    this.todoService.getTodos().subscribe(todo => {
      console.log(todo);
      // this.todos = todo.filter(todo => !todo.isCompleted);
      this.todos = todo.filter(todo => !todo.isCompleted).sort((a, b) => b.importance - a.importance);
      this.completedTodos = todo.filter(todo => todo.isCompleted).sort((a, b) => b.importance - a.importance);
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
