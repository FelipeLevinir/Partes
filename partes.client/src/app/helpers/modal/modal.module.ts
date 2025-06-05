import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '@/helpers/modal/modal/modal.component';
import { ModalContenidoDirective } from './directives/modal-contenido.directive';
import { ModalFooterDirective } from './directives/modal-footer.directive';
import { ModalHeaderDirective } from './directives/modal-header.directive';
import { ModalService } from './service/modal.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonAnularComponent } from '@/tools/buttons/button-anular/button-anular.component';
import { ButtonCerrarComponent } from '@/tools/buttons/button-cerrar/button-cerrar.component';
import { ButtonGuardarComponent } from '@/tools/buttons/button-guardar/button-guardar.component';
import { ButtonModule } from 'primeng/button';
import { ButtonEnviarComponent } from '@/tools/buttons/button-enviar/button-enviar.component';
import { ButtonObjetarComponent } from '@/tools/buttons/button-objetar/button-objetar.component';
import { ButtonRechazarComponent } from '@/tools/buttons/button-rechazar/button-rechazar.component';
import { ButtonVisarComponent } from '@/tools/buttons/button-visar/button-visar.component';
import { ButtonAccionBaseComponent } from '@/tools/buttons/button-accion-base/button-accion-base.component';
import { ModalConfirmarAccionComponent } from '@/tools/modal-confirmar-accion/modal-confirmar-accion.component';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { DocumentoComponent } from '@/tools/documento/documento.component';
import { InputTextModule } from 'primeng/inputtext';
import { PanelInfoModule } from '@/tools/panel-info/panel-info.module';
import { TabsModule } from 'primeng/tabs';
import { TabErrorClassDirective } from './directives/tab-error-class.directive';

@NgModule({
  declarations: [
      ModalComponent,
      ModalContenidoDirective,
      ModalFooterDirective,
      ModalHeaderDirective,
      ButtonAnularComponent,
      ButtonCerrarComponent,
      ButtonEnviarComponent,
      ButtonGuardarComponent,
      ButtonObjetarComponent,
      ButtonRechazarComponent,
      ButtonVisarComponent,
      ButtonAccionBaseComponent,
      ModalConfirmarAccionComponent,
      TabErrorClassDirective
 
  ],
  imports: [
      CommonModule,
      DialogModule,  
      ButtonModule,
      SelectModule,
      FormsModule,
      DocumentoComponent,
      InputTextModule,
      PanelInfoModule,
      TabsModule
  ],
  providers: [
      ModalService,
      
  ],
  exports: [
      ModalComponent,
      ModalContenidoDirective,
      ModalFooterDirective,
      ModalHeaderDirective,
      ButtonAnularComponent,
      ButtonCerrarComponent,
      ButtonEnviarComponent,
      ButtonGuardarComponent,
      ButtonObjetarComponent,
      ButtonRechazarComponent,
      ButtonVisarComponent,
      ButtonAccionBaseComponent,
      ModalConfirmarAccionComponent,
      PanelInfoModule,
      TabErrorClassDirective
  ]
})
export class ModalModule { }
