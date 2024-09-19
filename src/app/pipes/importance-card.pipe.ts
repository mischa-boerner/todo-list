import { Pipe, PipeTransform } from '@angular/core';
import {Todo} from "../interfaces/todo";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Pipe({
  name: 'importanceCard',
  standalone: true
})
export class ImportanceCardPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(todo: Todo): SafeHtml {
    let importance = 'Normal';
    let color = 'black';

    switch (todo.importance) {
      case 1:
        importance = 'Important';
        color = 'orange';
        break;
      case 2:
        importance = 'Urgent';
        color = 'red';
        break;
    }

    if (todo.isCompleted) {
      importance = 'Complete'
      color = 'limegreen';
    }

    const html = `<div style="background-color: ${color}; color: white; border-radius: 15px; padding: 4px">${importance}</div>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
