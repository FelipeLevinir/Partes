import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'RUT',
  standalone: true,
})

export class RUTPipe implements PipeTransform {
 
   transform(value: any): string | null {
      if (!value) return null;
      return new Intl.NumberFormat('es-CL').format(value.Numero) + '-' + value.DV;
    }

}
