import { Component, OnInit } from '@angular/core';
import { ButtonAccionBaseComponent } from '../button-accion-base/button-accion-base.component';
import { ConfirmarAccionTipo } from '@/tools/modal-confirmar-accion/modal-confirmar-accion.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'button-guardar',
  templateUrl: './button-guardar.component.html',
  styleUrl: './button-guardar.component.scss',
  standalone: false
})
export class ButtonGuardarComponent extends ButtonAccionBaseComponent implements OnInit {
 
   ngOnInit(): void {
      this.AccionTipo = ConfirmarAccionTipo.GUARDAR;
      if (!this.label) { this.label = "Guardar" }
   }
}
