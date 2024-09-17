import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Todo } from '../interfaces/todo';

@Pipe({
  name: 'importance',
  standalone: true
})
export class ImportancePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(todo: Todo): SafeHtml {
    let prefix = '';
    let color = 'black';

    switch (todo.importance) {
      case 1:
        prefix = '! ';
        color = 'orange';
        break;
      case 2:
        prefix = '!! ';
        color = 'red';
        break;
    }

    const html = `<span><span style="color: ${color}">${prefix}</span>${todo.taskTitle}</span>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
