import {   Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
 
 @Directive({
   selector: '[tabErrorClass]',
   standalone: false
 })
 export class TabErrorClassDirective implements OnChanges {
   @Input('tabErrorClass') hasError: boolean | undefined = undefined;
 
   private errorClass = 'tab-error';
 
   constructor(private el: ElementRef, 
               private renderer: Renderer2) {}
 
   ngOnChanges(changes: SimpleChanges): void {
     const tabHeader = this.findTabHeaderElement();
 
     if (!tabHeader) return;
 
     if (this.hasError) {
       this.renderer.addClass(tabHeader, this.errorClass);
     } else {
       this.renderer.removeClass(tabHeader, this.errorClass);
     }
   }
   
   //Buscar el elemento con role="tab" más cercano (puede estar hacia arriba o ser hermano)
   private findTabHeaderElement(): HTMLElement | null {
      let current: HTMLElement | null = this.el.nativeElement;
      const candidate = current?.closest('[role="tab"]');

      return candidate as HTMLElement | null;
   }
 }
 