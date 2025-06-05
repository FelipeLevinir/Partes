import { EventEmitter, KeyValueDiffers } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalFooterDirective } from '../directives/modal-footer.directive';
import { ObjectDiffer } from './object-differ';
  

export interface IModal {
    //Este es el dato m�ximo que se debe pasar como parametro en el modal,
    //NO HAY QUE PASAR UN OBJETO, SINO QUE SIEMPRE IR A BUSCARLO A LA DB
  

    header: string | null;

    headerChange: EventEmitter<string>;

    InputData: any;

    Result: any;

    onClose: EventEmitter<any>

    Differs: KeyValueDiffers | null;

    objectDiffer: ObjectDiffer | null;

    ModalForm: NgForm | null;

    Saving: boolean;

    Saved: boolean;

    ObservableData: any;

    SetFormData(prmData: any): void;

    Close(result?: any): void;

    Load(): void;

    Loading(): any;

    Save(): void;

    Footer: ModalFooterDirective | null;

}
