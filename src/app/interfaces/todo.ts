import {EventEmitter, Input, Output} from "@angular/core";

export interface Todo {
  id: string;
  taskTitle: string;
  isCompleted: boolean;
  taskDescription: string;
}
