import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'filter'
})

export class FilterPipe implements PipeTransform {
    transform(value: any, arg: any): any {
        const result = [];

        for (const obj of value) {
            if ((obj.name.toLowerCase().indexOf(arg.toLowerCase()) > -1)
                || (obj.description.toLowerCase().indexOf(arg.toLowerCase()) > -1)) {
                result.push(obj);
            }
        }
        return result;
    }
}