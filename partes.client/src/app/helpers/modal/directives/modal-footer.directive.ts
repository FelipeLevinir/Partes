import { Directive, ElementRef, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
   selector: '[ModalFooter]',
   standalone: false
})
export class ModalFooterDirective {

    constructor(private element: ElementRef,
        private templateRef: TemplateRef<any>,
        public viewContainerRef: ViewContainerRef) {
         this.viewContainerRef.createEmbeddedView(this.templateRef);


    }

}
