import { Pipe, PipeTransform } from '@angular/core';
import {Todo} from "../interfaces/todo";

@Pipe({
  name: 'importanceCard',
  standalone: true
})
export class ImportanceCardPipe implements PipeTransform {
  transform(todo: Todo): string {
    if (todo.isCompleted) {
      return 'complete';
    }

    switch (todo.importance) {
      case 1:
        return 'important';
      case 2:
        return 'urgent';
      default:
        return 'normal';
    }
  }

}
