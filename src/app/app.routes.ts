import { Routes } from '@angular/router';
import {TodoListComponent} from "./components/todo-list/todo-list.component";
import {TodoDetailComponent} from "./components/todo-detail/todo-detail.component";
import {NgModule} from "@angular/core";

export const routes: Routes = [
  { path: '', redirectTo:'/list', pathMatch: 'full'},
  { path: 'list', component: TodoListComponent },
  { path: 'todo/:id', component: TodoDetailComponent},
];
