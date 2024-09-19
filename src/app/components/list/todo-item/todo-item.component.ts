import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {Todo} from "../../../interfaces/todo";
import {ImportancePipe} from "../../../pipes/importance.pipe";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    ImportancePipe,
    NgClass
  ],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() isCompletedChange = new EventEmitter<boolean>();

  constructor(private router: Router) {}

  onCheckboxChange() {
    this.isCompletedChange.emit(this.todo.isCompleted);
  }

  navigateToDetail(id: string) {
    this.router.navigate(['/todo', id]);
  }
}
