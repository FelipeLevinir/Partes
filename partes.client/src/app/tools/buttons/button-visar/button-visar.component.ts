import { Component, OnInit } from '@angular/core';
import { ButtonAccionBaseComponent } from '../button-accion-base/button-accion-base.component';
import { ConfirmarAccionTipo } from '@/tools/modal-confirmar-accion/modal-confirmar-accion.component';

@Component({
  selector: 'button-visar',
  templateUrl: './button-visar.component.html',
  styleUrl: './button-visar.component.scss',
  standalone: false
})
export class ButtonVisarComponent extends ButtonAccionBaseComponent implements OnInit {


   ngOnInit(): void {
       this.AccionTipo = ConfirmarAccionTipo.VISAR;
       if (!this.label) { this.label = "Visar" }
   }
}
 
