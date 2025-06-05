import { Component, Input } from '@angular/core';
import { SeguimientoService } from './seguimiento.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FechaHoraPipe } from '@/helpers/pipes/fecha-hora.pipe';

@Component({
  selector: 'seguimiento',
  imports: [CommonModule,
            FechaHoraPipe
  ],
  templateUrl: './seguimiento.component.html',
  styleUrl: './seguimiento.component.scss',
  providers:[DatePipe]
})
export class SeguimientoComponent {
   @Input() Solicitud: any;

   TiposSeguimiento = TiposSeguimiento;

   constructor(private seguimientoService: SeguimientoService)
   {
       
   }

   VerAdjunto(prmItem: any) {
       this.seguimientoService.SeguimientoAdjuntoGetItem(prmItem?.Adjunto?.Id);
   }
}



export enum TiposSeguimiento {
   NoValida = 1,
   Valida = 2,
   Ingreso = 3,
   Visacion = 4,
   Objecion = 5,
   Rechazo = 6,
   Anulacion = 13

}
