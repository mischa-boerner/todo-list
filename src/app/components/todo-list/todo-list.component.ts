import {Component, ComponentRef, ElementRef, ViewChild, ViewContainerRef} from '@angular/core';
import {TodoItemComponent} from "../todo-item/todo-item.component";
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  @ViewChild('todoListContainer', {
    read: ViewContainerRef,
    static: true
  }) container!: ViewContainerRef;

  @ViewChild('taskInput', {
    static: true
  }) taskInput!: ElementRef;

  private taskComponents: ComponentRef<TodoItemComponent>[] = [];

  addTodoItem() {
    const taskTitle = this.taskInput.nativeElement.value;

    if (taskTitle.trim) {
      const componentRef = this.container.createComponent(TodoItemComponent);
      componentRef.instance.taskTitle = taskTitle;
      componentRef.instance.id = uuidv4();
      this.taskComponents.push(componentRef); //Fügt neuen Task zu taskComponents hinzu
      this.taskInput.nativeElement.value = '';
    }
  }

  clearCompletedTasks() {
    for (let i = this.taskComponents.length - 1; i >= 0; i--) {
      if (this.taskComponents[i].instance.isCompleted) {
        this.taskComponents[i].destroy();
        this.taskComponents.splice(i, 1);
      }
    }
  }
}
