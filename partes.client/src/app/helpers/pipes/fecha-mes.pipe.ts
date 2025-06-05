import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaMes',
  standalone: true
})
export class FechaMesPipe implements PipeTransform {

   transform(prmFecha: Date): string | null{
      if(!prmFecha) return null;

      return prmFecha.toLocaleDateString('es', { month: 'short', year: 'numeric' });
   }

}
