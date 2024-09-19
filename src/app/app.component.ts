import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {TodoStatusComponent} from "./components/header/todo-status/todo-status.component";
import {ViewSelectorComponent} from "./components/header/view-selector/view-selector.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, TodoStatusComponent, ViewSelectorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'todo-list';
}
