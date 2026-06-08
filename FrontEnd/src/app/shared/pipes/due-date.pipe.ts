import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dueDate',
  standalone: true
})
export class DueDatePipe implements PipeTransform {
  transform(value: string | Date): string {
    const date = value instanceof Date ? value : new Date(value);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  }
}
