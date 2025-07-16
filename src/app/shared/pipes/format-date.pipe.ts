import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {
  transform(value: Date | string | undefined, format: string = 'mediumDate'): string {
    if (!value) return '';
    
    const date = typeof value === 'string' ? new Date(value) : value;
    return new DatePipe('en-US').transform(date, format) || '';
  }
}