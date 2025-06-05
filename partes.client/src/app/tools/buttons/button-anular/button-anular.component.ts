import { ConfirmarAccionTipo } from '@/tools/modal-confirmar-accion/modal-confirmar-accion.component';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ButtonAccionBaseComponent } from '../button-accion-base/button-accion-base.component';

@Component({
  selector: 'button-anular',
  templateUrl: './button-anular.component.html',
  styleUrl: './button-anular.component.scss',
  standalone: false
})
export class ButtonAnularComponent extends ButtonAccionBaseComponent implements OnInit {


   ngOnInit(): void {
       this.AccionTipo = ConfirmarAccionTipo.ANULAR;
       if (!this.label) { this.label = "Anular" }
   }
}