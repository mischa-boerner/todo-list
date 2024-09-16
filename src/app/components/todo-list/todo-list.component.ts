import {Component, ComponentRef, ElementRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {TodoItemComponent} from "../todo-item/todo-item.component";
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit{
  @ViewChild('todoListContainer', {
    read: ViewContainerRef,
    static: true
  }) container!: ViewContainerRef;

  @ViewChild('taskInput', {
    static: true
  }) taskInput!: ElementRef;

  private taskComponents: ComponentRef<TodoItemComponent>[] = [];
  private todoItems: {id: string, taskTitle: string, isCompleted:boolean, taskDescription:string}[] = [];

  ngOnInit() {
    this.loadData();
  }

  //Fügt neuen Task hinzu und speicher diesen direkt ab
  addTodoItem() {
    const taskTitle = this.taskInput.nativeElement.value; //Zieht Task Titel aus Input Feld

    if (taskTitle.trim) {
      //Fügt Task Daten dem Local Storage array hinzu
      this.todoItems.push({
        id: uuidv4(),
        taskTitle: taskTitle,
        isCompleted: false,
        taskDescription: ""
      });

      this.saveData();
      this.loadData();
      this.taskInput.nativeElement.value = '';
    }
  }

  //Sucht alle abgeschlossenen Tasks und löscht diese und speichert anschließend
  clearCompletedTasks() {
    for (let i = this.taskComponents.length - 1; i >= 0; i--) {
      if (this.taskComponents[i].instance.isCompleted) {
        this.taskComponents[i].destroy();
        this.taskComponents.splice(i, 1);
        this.todoItems.splice(i, 1);
      }
    }
    this.saveData();
  }

  //Updated Task wenn sich der Status der Checkbox ändert
  updateTodoItem(id: string, isCompleted: boolean) {
    const item = this.todoItems.find(item => item.id === id);
    if (item) {
      item.isCompleted = isCompleted;
      this.saveData();
    }
  }

  //Speichert todoItems Array im local storage
  saveData() {
    localStorage.setItem('todoItems', JSON.stringify(this.todoItems));
  }

  //Läd Tasks auf dem Local Storage
  loadData() {
    //Cleared alle Arrays und Container vor dem Laden
    this.taskComponents = [];
    this.todoItems = [];
    this.container.clear();

    const savedData = localStorage.getItem('todoItems');

    //Erstellt Components aus den geladenen Daten
    if(savedData) {
      this.todoItems = JSON.parse(savedData);
      this.todoItems.forEach(item => {
        const componentRef = this.container.createComponent(TodoItemComponent);
        componentRef.instance.id = item.id;
        componentRef.instance.taskTitle = item.taskTitle;
        componentRef.instance.isCompleted = item.isCompleted;
        componentRef.instance.isCompletedChange.subscribe((isCompleted: boolean) => {
          this.updateTodoItem(componentRef.instance.id, isCompleted);
        });
        this.taskComponents.push(componentRef);
      });
    }
  }
}
