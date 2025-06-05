import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaHora',
  standalone: true, 
})
export class FechaHoraPipe implements PipeTransform {
 
   transform(prmFecha: Date | string | null): string | null {
      if (!prmFecha) return null;
     
      const vFecha = typeof prmFecha === 'string' ? new Date(prmFecha) : prmFecha;

      if (isNaN(vFecha.getTime())) return null;

      
      return new Intl.DateTimeFormat('es', {
         day: '2-digit',
         month: 'short',
         year: 'numeric',
         hour: '2-digit',
         minute: '2-digit',
         hour12: false // Formato 24 horas
      }).format(vFecha);
   }
}
