import { Component, OnInit } from '@angular/core';
import { ButtonAccionBaseComponent } from '../button-accion-base/button-accion-base.component';
import { ConfirmarAccionTipo } from '@/tools/modal-confirmar-accion/modal-confirmar-accion.component';

@Component({
  selector: 'button-rechazar',
  templateUrl: './button-rechazar.component.html',
  styleUrl: './button-rechazar.component.scss',
  standalone: false
})
export class ButtonRechazarComponent extends ButtonAccionBaseComponent implements OnInit {
 
   ngOnInit(): void {
      this.AccionTipo = ConfirmarAccionTipo.RECHAZAR;
      if (!this.label) { this.label = "Rechazar" }
   }
}