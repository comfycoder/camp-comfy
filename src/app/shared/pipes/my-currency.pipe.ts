import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myCurrency'
})
export class MyCurrencyPipe implements PipeTransform {

  constructor() { }

  transform(value: number | string, decimalPlaces: number = 0): string {

    if (value) {

     value = parseFloat(value.toString());

      const numStr = value.toFixed(decimalPlaces);

      const numText = Number(numStr).toLocaleString();

      return '$' + numText;
    }

    return '';
  }

  parse(value: string, decimalPlaces: number = 0): string {

    if (value && value.length > 0) {

      // normalize number string and remove all unnecessary characters
      value = value.replace(/[^-.0-9]/g, '');

      const num = parseFloat(value);

     return num.toFixed(decimalPlaces);
    }

    return '';
  }
}
