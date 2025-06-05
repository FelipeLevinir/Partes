import { Directive, ElementRef, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
   selector: '[ModalHeader]',
   standalone: false
})
export class ModalHeaderDirective {

    constructor(private element: ElementRef,
        private templateRef: TemplateRef<any>,
        public viewContainerRef: ViewContainerRef) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);


    }

}
