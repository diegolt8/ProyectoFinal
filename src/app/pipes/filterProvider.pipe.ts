import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'filterProvider'
})

export class FilterProviderPipe implements PipeTransform {
    transform(value: any, arg: any): any {
        const result = [];

        for (const obj of value) {
            if ((obj.name.toLowerCase().indexOf(arg.toLowerCase()) > -1)
                || (obj.nit.toLowerCase().indexOf(arg.toLowerCase()) > -1)) {
                result.push(obj);
            }
        }
        return result;
    }
}