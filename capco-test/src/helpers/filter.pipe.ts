import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'filter'
})
@Injectable()
export default class CustomFilterPipe implements PipeTransform {
  transform(
    items: any[],
    id: string,
    requisition: number,
    recruiter: string,
    manager: string,
    privacy: string,
    value: string
  ): any[] {
    console.log('------items-------', items);
    if (!items) {
      return [];
    }
    if (!requisition || !id || !value) {
      return items;
    }

    return items.filter(
      singleItem =>
        singleItem[id]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        singleItem[requisition].toLowerCase().includes(value.toLowerCase()) ||
        singleItem[recruiter].toLowerCase().includes(value.toLowerCase()) ||
        singleItem[manager].toLowerCase().includes(value.toLowerCase()) ||
        singleItem[privacy].toLowerCase().includes(value.toLowerCase())
    );
  }
}
