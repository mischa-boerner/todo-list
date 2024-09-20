import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgIf} from "@angular/common";
import {Observable} from "rxjs";
import {Todo} from "../../interfaces/todo";
import {TodoService} from "../../service/todo.service";

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent implements OnInit {
  @Output() update = new EventEmitter<void>();

  private todoService: TodoService = inject(TodoService);
  private intervalId: any;

  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.checkServerStatus()
    this.intervalId = setInterval(() => this.checkServerStatus(), 5000);
  }

  checkServerStatus() {
    this.todoService.getTodos().subscribe({
      next: () => {
        if (this.loading) {
          this.update.emit();
          this.loading = false;
        }
      },
      error: () => {
        this.loading = true;
      }
    });
  }
}
