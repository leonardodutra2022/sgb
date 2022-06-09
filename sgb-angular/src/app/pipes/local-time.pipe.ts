import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'localTime'
})
export class LocalTimePipe implements PipeTransform {

  transform(date: string): string {
    let dateOut: moment.Moment = moment(date, "HH,mm");
    return dateOut.format("HH:mm");
  }

}
