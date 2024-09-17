import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Todo} from "../interfaces/todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  SERVER_URL: string = "http://localhost:3000/";
  private httpClient = inject(HttpClient);

  public getTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(this.SERVER_URL + 'todos');
  }

  public getTodoById(id: string): Observable<Todo> {
    return this.httpClient.get<Todo>(this.SERVER_URL + 'todos/' + id);
  }

  public putTodos(todo: Todo): Observable<Todo> {
    return this.httpClient.put<Todo>(this.SERVER_URL + 'todos/' + todo.id, todo);
  }

  public postTodos(todo: Todo): Observable<Todo> {
    return this.httpClient.post<Todo>(this.SERVER_URL + 'todos', todo);
  }

  public deleteTodo(id: string): Observable<void> {
    return this.httpClient.delete<void>(this.SERVER_URL + 'todos/' + id);
  }

  // public genId(todos: Todo[]) {
  //   return todos.length > 0 ? Math.max(...todos.map((t) => Number(t.id))) + 1 : 1;
  // }
}
