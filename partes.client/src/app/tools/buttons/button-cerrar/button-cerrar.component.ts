import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'button-cerrar',
  templateUrl: './button-cerrar.component.html',
  styleUrl: './button-cerrar.component.scss',
  standalone: false,
})
export class ButtonCerrarComponent {
   @Input() label: string = "Cerrar";
   @Input() disabled: boolean = false;

   @Output() click: EventEmitter<any> = new EventEmitter<any>();
}