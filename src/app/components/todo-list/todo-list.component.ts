import {Component, ElementRef, HostListener, inject, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {TodoItemComponent} from "../todo-item/todo-item.component";
import { v4 as uuidv4 } from 'uuid';
import {TodoService} from "../../service/todo.service";
import {Todo} from "../../interfaces/todo";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    TodoItemComponent
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
  searchTodos: Todo[] = [];
  searchCompletedTodos: Todo[] = [];
  showCompleted = false;
  isSearching = false;

  ngOnInit() {
    this.loadData();
  }

  //Fügt neuen Task hinzu und speicher diesen direkt ab
  addTodoItem() {
    const taskTitle = this.taskInput.nativeElement.value; //Zieht Task Titel aus Input Feld
    console.log(this.todos);

    if (taskTitle.trim()) {
      const newTodo: Todo = {
        id: uuidv4(),
        taskTitle: taskTitle,
        taskDescription: "",
        isCompleted: false
      }

      this.saveData(newTodo);
      this.taskInput.nativeElement.value = '';
    }
  }

  showCompletedTasks() {
    this.showCompleted = !this.showCompleted;
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

  saveData(todo: Todo) {
    this.todoService.postTodos(todo).subscribe(savedTodo => {
      console.log("Todo saved: ", savedTodo);
      this.loadData();
    })
  }

  loadData() {
    this.todoService.getTodos().subscribe(todo => {
      console.log(todo);
      this.todos = todo.filter(todo => !todo.isCompleted);
      this.completedTodos = todo.filter(todo => todo.isCompleted)
    });
  }

  search(text: string) {
    this.isSearching = true;
    if(!text.trim()) {
      this.searchTodos = [];
      this.searchInput.nativeElement.value = '';
      this.isSearching = false;
      return;
    }

    this.searchTodos = this.todos.filter(todo =>
      todo.taskTitle.toLowerCase().includes(text.toLowerCase())
    );

    this.searchCompletedTodos = this.completedTodos.filter(todo =>
      todo.taskTitle.toLowerCase().includes(text.toLowerCase())
    );
  }

  deleteCompletedTodos() {
    const deleteRequests = this.completedTodos.map(todo => this.todoService.deleteTodo(todo.id));
    forkJoin(deleteRequests).subscribe(() => {
      this.loadData();
    });
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    this.search('');
  }

  @HostListener('document:keydown.enter', ['$event'])
  handleEnterKey(event: KeyboardEvent) {
    if (document.activeElement === this.searchInput.nativeElement) {
      this.search(this.searchInput.nativeElement.value);
    } else if (document.activeElement === this.taskInput.nativeElement) {
      this.addTodoItem();
    }
  }
}
