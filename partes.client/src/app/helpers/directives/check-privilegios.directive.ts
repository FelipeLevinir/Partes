import { Attribute, Directive, Renderer2, ViewContainerRef, TemplateRef, OnInit, AfterViewInit, Input, EmbeddedViewRef } from '@angular/core';
import { GlobalService } from '../services/global.service';
import { ComponentePermiso } from '../interfaces/componente-permiso';
 
 

@Directive({
  selector: '[CheckPrivilegios]'
})
export class CheckPrivilegiosDirective implements OnInit, AfterViewInit {
    

    @Input() set CheckPrivilegios(Id: string) {
        if (Id) { this.Id = Id; }

    }

    private Id: string;
    private ComponentId: string | undefined;


    constructor( @Attribute('id') id: string,
                 @Attribute('component-id') componentId: string,
                  private readonly templateRef: TemplateRef<any>,
                  private readonly viewContainer: ViewContainerRef,
                  private readonly renderer: Renderer2,
                  private readonly globalService: GlobalService)
    {
        this.Id = id;
        this.ComponentId = componentId;
    }
    ngAfterViewInit(): void {
      return;
    }

    ngOnInit(): void {
      let vPermiso: ComponentePermiso | undefined = undefined;

      if (!this.Id && !this.ComponentId) {
         this.viewContainer.createEmbeddedView(this.templateRef);
         return;
      }

      vPermiso = this.globalService?.CurrentUser?.Privilegios!.Permisos.find((value: ComponentePermiso) => {
         if (value.Componente.HtmlId.toLowerCase() == this.Id?.toLowerCase() || value.Componente.HtmlId.toLowerCase() == this.ComponentId?.toLowerCase()) {
            return value;
         }else{
            return null;
         }
      })


      if (vPermiso) {
         switch (vPermiso.Permiso.Id) {
               //FULL
               case 1: {
                  this.viewContainer.createEmbeddedView(this.templateRef);
                  break;
               }

               //SOLO LECTURA
               case 2: {

                  let view = this.viewContainer.createEmbeddedView(this.templateRef);

                  let rootElem: EmbeddedViewRef<any> = view.rootNodes[0];

                  if (rootElem) {
                     this.renderer.setProperty(rootElem, 'disabled', 'true');
                     
                     
                  }

                  break;
               }

               //OCULTO
               case 3: {
                  this.viewContainer.clear();
                  break;
               }


               //OTROS NO DEFINIDO SE OCULTA
               default: { this.viewContainer.clear(); }
         }



      }
      else {
         this.viewContainer.clear();
      }
    }

}
