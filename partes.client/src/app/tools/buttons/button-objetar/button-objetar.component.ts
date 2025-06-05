import { Component, OnInit } from '@angular/core';
import { ConfirmarAccionTipo } from '@/tools/modal-confirmar-accion/modal-confirmar-accion.component';
import { ButtonAccionBaseComponent } from '../button-accion-base/button-accion-base.component';

@Component({
  selector: 'button-objetar',
  templateUrl: './button-objetar.component.html',
  styleUrl: './button-objetar.component.scss',
  standalone: false
})
export class ButtonObjetarComponent extends ButtonAccionBaseComponent implements OnInit {


   ngOnInit(): void {
       this.AccionTipo = ConfirmarAccionTipo.OBJETAR;
       if (!this.label) { this.label = "Objetar" }
   }
}