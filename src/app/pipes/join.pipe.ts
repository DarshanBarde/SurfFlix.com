import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join'
})
export class JoinPipe implements PipeTransform {
  transform(array: any[], separator: string): string {
    if (!array) {
      return '';
    }
    return array.join(separator);
  }
}