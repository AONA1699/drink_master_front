import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousandSeparator'
})
export class ThousandSeparatorPipe implements PipeTransform {

  transform(value: number | string): string {
    if (typeof value === 'string') {
      value = parseFloat(value);
    }
    
    if (isNaN(value)) {
      return '';  // Retorna un string vacío si el valor no es un número
    }

    // Utilizar el método toLocaleString para formatear con separadores de miles
    return value.toLocaleString('en-US');
  }

}
