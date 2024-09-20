import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {Todo} from "../../../interfaces/todo";
import {ImportancePipe} from "../../../pipes/importance.pipe";
import {NgClass} from "@angular/common";
import {MatTooltip} from "@angular/material/tooltip";
import {ImportanceCardPipe} from "../../../pipes/importance-card.pipe";
import {TodoService} from "../../../service/todo.service";

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    ImportancePipe,
    NgClass,
    MatTooltip,
    ImportanceCardPipe
  ],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() isSelectedChange = new EventEmitter<void>();

  private todoService: TodoService = inject(TodoService);


  constructor(private router: Router) {}

  onCheckboxChange() {
    if (this.todo) {
      this.todoService.putTodos(this.todo).subscribe(updatedTodo => {
        console.log('Todo updated:', updatedTodo);
        this.isSelectedChange.emit();
      });
    }
  }

  navigateToDetail(id: string) {
    this.router.navigate(['/todo', id]);
  }
}
