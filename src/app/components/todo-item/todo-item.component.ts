import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {
  @Input() id!: string;
  @Input() taskTitle!: string;
  @Input() isCompleted = false;
  @Output() isCompletedChange = new EventEmitter<boolean>();

  constructor(private router: Router) {}

  onCheckboxChange() {
    this.isCompletedChange.emit(this.isCompleted);
  }
}
