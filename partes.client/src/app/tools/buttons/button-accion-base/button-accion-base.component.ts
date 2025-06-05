import { ModalService } from '@/helpers/modal/service/modal.service';
import { ConfirmarAccionOptions, ConfirmarAccionResultado, ConfirmarAccionTipo, ModalConfirmarAccionComponent } from '@/tools/modal-confirmar-accion/modal-confirmar-accion.component';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-accion-base',
  standalone: false,
  templateUrl: './button-accion-base.component.html',
  styleUrl: './button-accion-base.component.scss'
})
export class ButtonAccionBaseComponent {
   @Input() label: string = '';
   @Input() disabled: boolean = false;

   @Output() onClick: EventEmitter<ConfirmarAccionResultado> = new EventEmitter<ConfirmarAccionResultado>();

 
   @Input() ConfirmarAccion: ConfirmarAccionOptions | undefined;
 
   AccionTipo: ConfirmarAccionTipo | undefined;

   constructor(private readonly modalService: ModalService) { }

   doAccion() {
      if (this.ConfirmarAccion) {

         let vInput: ConfirmarAccionOptions = this.ConfirmarAccion;
         vInput.TipoAccion = this.AccionTipo
      

         this.modalService.show(ModalConfirmarAccionComponent, vInput, 'modal',
            (result) => {
               if (result) { 
                  this.onClick.emit(result) 
               }
            })

      }
      else {
         this.onClick.emit()
      }

   }
}
