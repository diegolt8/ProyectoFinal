import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'filterUser'
})

export class FilterPipeUser implements PipeTransform {
    transform(value: any, arg: any): any {
        const result = [];

        for (const obj of value) {
            if ((obj.documentnumber.toLowerCase().indexOf(arg.toLowerCase()) > -1)
                || (obj.rol_id.toLowerCase().indexOf(arg.toLowerCase()) > -1)) {
                result.push(obj);
            }
        }
        return result;
    }
}