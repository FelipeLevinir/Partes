import { Component, OnInit } from '@angular/core';
import { ButtonAccionBaseComponent } from '../button-accion-base/button-accion-base.component';
import { ConfirmarAccionTipo } from '@/tools/modal-confirmar-accion/modal-confirmar-accion.component';

@Component({
  selector: 'button-enviar',
  templateUrl: './button-enviar.component.html',
  styleUrl: './button-enviar.component.scss',
  standalone: false,
})
export class ButtonEnviarComponent extends ButtonAccionBaseComponent implements OnInit {

   ngOnInit(): void {
      this.AccionTipo = ConfirmarAccionTipo.ENVIAR;
      if (!this.label) { this.label="Enviar"}
   }
   
}
