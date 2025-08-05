import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluck'
})
export class PluckPipe implements PipeTransform {
  transform(array: any[], key: string): any[] {
    if (!array || !key) {
      return [];
    }
    return array.map(item => item[key]);
  }
}