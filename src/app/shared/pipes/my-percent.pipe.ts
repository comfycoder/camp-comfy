import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myPercent'
})
export class MyPercentPipe implements PipeTransform {

   transform(value: number | string, decimalPlaces: number = 2): string {

    if (value) {

      value = parseFloat(value.toString());

      const numStr = value.toFixed(decimalPlaces);

      return numStr + '%';
    }

    return '';
  }

  parse(value: string, decimalPlaces: number = 2): string {

    if (value && value.length > 0) {

      // normalize number string and remove all unnecessary characters
      value = value.replace(/[^-.0-9]/g, '');

      const num = parseFloat(value);

      return num.toFixed(decimalPlaces);
    }

    return '';
  }
}
