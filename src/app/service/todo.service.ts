import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of, Subject, tap} from "rxjs";
import {Todo} from "../interfaces/todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  SERVER_URL: string = "http://localhost:3000/";
  private httpClient = inject(HttpClient);

  private todoUpdatedSource = new Subject<void>();
  todoUpdate$ = this.todoUpdatedSource.asObservable();

  public getTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(this.SERVER_URL + 'todos');
  }

  public getTodoById(id: string): Observable<Todo> {
    return this.httpClient.get<Todo>(this.SERVER_URL + 'todos/' + id);
  }

  public putTodos(todo: Todo): Observable<Todo> {
    return this.httpClient.put<Todo>(this.SERVER_URL + 'todos/' + todo.id, todo).pipe(
      tap(() => this.todoUpdatedSource.next())
    );
  }

  public postTodos(todo: Todo): Observable<Todo> {
    return this.httpClient.post<Todo>(this.SERVER_URL + 'todos', todo).pipe(
      tap(() => this.todoUpdatedSource.next())
    );
  }

  public deleteTodo(id: string): Observable<void> {
    return this.httpClient.delete<void>(this.SERVER_URL + 'todos/' + id).pipe(
      tap(() => this.todoUpdatedSource.next())
    );
  }
}
