import { Injectable } from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";
import {Todo} from "../interfaces/todo";

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService{

  createDb() {
    let todos: Todo[] = [];

    return { todos };
  }
}
