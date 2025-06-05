import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha',
  standalone: true
})
export class FechaPipe implements PipeTransform {
 
   transform(prmFecha: Date | string | null): string | null {
      if (!prmFecha) return null;
   
      const vFecha = typeof prmFecha === 'string' ? new Date(prmFecha) : prmFecha;
      
      if (isNaN(vFecha.getTime())) return null;
  
      return new Intl.DateTimeFormat('es', {
        day: '2-digit',    // dd
        month: 'long',    // MMM (abr)
        year: 'numeric'    // yyyy
      }).format(vFecha);
    }
}
