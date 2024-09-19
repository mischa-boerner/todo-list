import {AfterViewInit, Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild} from '@angular/core';
import {TodoHeaderSearchComponent} from "../todo-header-search/todo-header-search.component";
import {TodoHeaderCreateComponent} from "../todo-header-create/todo-header-create.component";
import {Todo} from "../../../interfaces/todo";
import {TodoStatusComponent} from "../todo-status/todo-status.component";
import {ViewSelectorComponent} from "../view-selector/view-selector.component";

@Component({
  selector: 'app-todo-header',
  standalone: true,
    imports: [
        TodoHeaderSearchComponent,
        TodoHeaderCreateComponent,
        TodoStatusComponent,
        ViewSelectorComponent
    ],
  templateUrl: './todo-header.component.html',
  styleUrl: './todo-header.component.scss'
})
export class TodoHeaderComponent implements AfterViewInit{
  @ViewChild('headerContainer') headerContainer!: ElementRef;
  @ViewChild('headerPlaceholder') headerPlaceholder!: ElementRef;

  @Output() createTodo = new EventEmitter<void>();
  @Output() searchTodo = new EventEmitter<Todo[]>();

  ngAfterViewInit() {
    this.headerPlaceholder.nativeElement.style.height = `${this.getHeaderHeight()}px`;
  }

  onCreateTodo(todo: Todo) {
    this.createTodo.emit();
  }

  onSearchTodo(searchResult: Todo[]) {
    this.searchTodo.emit(searchResult);
  }

  getHeaderHeight(): number {
    return this.headerContainer.nativeElement.offsetHeight;
  }

  scrollToSection(sectionId: string) {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerHeight = this.getHeaderHeight();
      window.scrollTo({
        top: section.offsetTop - headerHeight,
        behavior: 'smooth'
      });
    }
  }

}
