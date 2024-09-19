import { Routes } from '@angular/router';
import {TodoListComponent} from "./components/list/todo-list/todo-list.component";
import {TodoDetailComponent} from "./components/todo-detail/todo-detail.component";
import {NgModule} from "@angular/core";
import {TodoCardViewComponent} from "./components/card/todo-card-view/todo-card-view.component";

export const routes: Routes = [
  { path: '', redirectTo:'/list', pathMatch: 'full'},
  { path: 'list', component: TodoListComponent },
  { path: 'card', component: TodoCardViewComponent },
  { path: 'todo/:id', component: TodoDetailComponent},
];
