import { ApplicationRef, createComponent, EmbeddedViewRef, EnvironmentInjector, Injectable, Injector, Type } from '@angular/core';
 import { ModalComponent } from '../modal/modal.component';
 import { IModal } from '../classes/imodal';
 
 @Injectable({
   providedIn: 'root'
 })
 export class ModalService {
 
   constructor(
     private appRef: ApplicationRef,
     private injector: Injector,
     private envInjector: EnvironmentInjector
   ) { }
 
   public show(
     component: Type<IModal>,
     InputData?: any,
     styleClass?: string,
     then?: (result: any) => void
   ) {
     // 1. Crear el componente dinámico
     const modalRef = createComponent(ModalComponent, {
       environmentInjector: this.envInjector,
       elementInjector: this.injector
     });
 
     // 2. Asignar inputs
     modalRef.instance.Component = component;
     modalRef.instance.InputData = InputData;
     modalRef.instance.styleClass = styleClass;
 
     // 3. Manejar cierre del modal
     modalRef.instance.onClose.subscribe((value) => {
       this.appRef.detachView(modalRef.hostView);
       modalRef.destroy();
       if (then) then(value);
     });
 
     // 4. Conectar al árbol de componentes
     this.appRef.attachView(modalRef.hostView);
 
     // 5. Insertar en el DOM
     const domElem = (modalRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
     document.body.appendChild(domElem);
   }
 }
 