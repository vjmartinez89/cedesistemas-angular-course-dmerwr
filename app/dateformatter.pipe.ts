import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dateformatter'
})
export class DateFormatterPipe implements PipeTransform {
    transform(value: Date): string { 
        let year = value.getFullYear();
        let month = value.getMonth() < 10 ? "0"+value.getMonth(): value.getMonth();
        let day = value.getDate() < 10 ? "0"+value.getDate(): value.getDate();
        return day+"/"+month+"/"+year;
    }
}