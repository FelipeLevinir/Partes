import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
   selector: '[ModalContenido]',
   standalone: false
})
export class ModalContenidoDirective {

    constructor(public viewContainerRef: ViewContainerRef) { }

}
