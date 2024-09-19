import {Component, inject, OnInit} from '@angular/core';
import {TodoCardComponent} from "../todo-card/todo-card.component";
import {Todo} from "../../../interfaces/todo";
import {TodoService} from "../../../service/todo.service";
import {NgForOf, NgIf} from "@angular/common";
import {TodoHeaderComponent} from "../../header/todo-header/todo-header.component";
import {forkJoin} from "rxjs";
import {CardSeperatorComponent} from "../card-seperator/card-seperator.component";

@Component({
  selector: 'app-todo-card-view',
  standalone: true,
  imports: [
    TodoCardComponent,
    NgForOf,
    TodoHeaderComponent,
    NgIf,
    CardSeperatorComponent,
    CardSeperatorComponent
  ],
  templateUrl: './todo-card-view.component.html',
  styleUrl: './todo-card-view.component.scss'
})
export class TodoCardViewComponent implements OnInit{
  private todoService: TodoService = inject(TodoService);

  urgentTodos: Todo[] = [];
  showAllUrgentTodos: boolean = false;

  importantTodos: Todo[] = [];
  showAllImportantTodos: boolean = false;

  normalTodos: Todo[] = [];
  showAllNormalTodos: boolean = false;

  completedTodos: Todo[] = [];
  showAllCompletedTodos: boolean = false;

  searchResult: Todo[] = [];

  selectedTodos: Todo[] = [];

  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    this.todoService.getTodos().subscribe(todo => {
      console.log(todo);
      this.urgentTodos = todo.filter(todo => !todo.isCompleted && todo.importance === 2);
      this.importantTodos = todo.filter(todo => !todo.isCompleted && todo.importance === 1);
      this.normalTodos = todo.filter(todo => !todo.isCompleted && todo.importance === 0);

      this.completedTodos = todo.filter(todo => todo.isCompleted);

      this.selectedTodos = todo.filter(todo => todo.isSelected);
    });
  }

  onSearchTodo(searchResult: Todo[]) {
    this.searchResult = searchResult;
  }

  trackById(index: number, item: Todo): string {
    return item.id;
  }
}
