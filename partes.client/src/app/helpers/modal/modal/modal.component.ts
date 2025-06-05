import { AfterViewInit, Component, ComponentRef, EventEmitter, KeyValueDiffers, OnInit, Output, Type, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IModal } from '../classes/imodal';
import { ModalContenidoDirective } from '../directives/modal-contenido.directive';
import { ModalFooterDirective } from '../directives/modal-footer.directive';
import { GlobalService } from '@/helpers/services/global.service';
 

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: false,
  
})
export class ModalComponent implements OnInit, AfterViewInit {

    @ViewChild(ModalContenidoDirective, { static: true }) ContenidoComponent: ModalContenidoDirective | null = null;
    @ViewChild(ModalFooterDirective) FooterComponent: ModalFooterDirective | null = null;
    @ViewChild("ModalForm") ModalForm: NgForm | null = null;

    @Output() onFooter: EventEmitter<any> = new EventEmitter<any>();



    Display: boolean = true;

    public onClose: EventEmitter<any> = new EventEmitter();

    public Component: Type<IModal> | null = null;
    public InputData: any;
    public ModalRef: ComponentRef<IModal> | undefined = undefined
    public header: string = "Título";
    public styleClass: string | undefined;


    constructor(private Differs: KeyValueDiffers, public globalService : GlobalService) { }
    
    ngAfterViewInit(): void {
        this.FooterComponent?.viewContainerRef.clear();
    
        if (this.ModalRef?.instance.Footer?.viewContainerRef) {
            const footer = this.ModalRef.instance.Footer.viewContainerRef.detach();
            if(footer)
               this.FooterComponent?.viewContainerRef.insert(footer)
        }


    }


    ngOnInit(): void {

        //const componentFactory = this.componentFactoryResolver.resolveComponentFactory<IModal>(this.Component!);
        const viewContainerRef = this.ContenidoComponent?.viewContainerRef;
        viewContainerRef?.clear();

        this.ModalRef = viewContainerRef?.createComponent(this.Component!);
        if(this.ModalRef){
           this.ModalRef.instance.InputData = this.InputData;
           this.ModalRef.instance.Differs = this.Differs;
        }

        this.ModalRef?.instance.onClose.subscribe((value) => {
            this.Display = false;
            this.ModalRef?.instance.onClose.unsubscribe();
            this.ModalRef?.destroy();
            this.onClose.emit(value);
        })



        this.ModalRef?.instance.headerChange.subscribe((value) => {
            setTimeout(() => {
                this.header = value;
            }, 0);
        })
    }




}
