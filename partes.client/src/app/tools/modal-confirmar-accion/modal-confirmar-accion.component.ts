import { Documento } from '@/helpers/classes/documento';
import { Modal } from '@/helpers/modal/classes/modal';
import { Component, OnInit } from '@angular/core';
 

@Component({
  selector: 'app-modal-confirmar-accion',
 
  templateUrl: './modal-confirmar-accion.component.html',
  styleUrl: './modal-confirmar-accion.component.scss',
  standalone: false
})
export class ModalConfirmarAccionComponent extends Modal implements OnInit {

   declare InputData: ConfirmarAccionOptions;
   declare Result: ConfirmarAccionResultado;

   constructor() {
       super();
   }

   override Close(prmResult: any) {
       this.Saved = true;
       super.Close(prmResult)
   }

   ngOnInit(): void {
      this.header = this.ModalUIConfig[this.InputData?.TipoAccion ?? 0].PrefixHeader + ' ' + this.InputData.Titulo;
      let vDoc: Documento = new Documento();
   
      vDoc.Tipo = { Id: 0, Nombre: "Archivo adjunto" };

      this.Result = {
         TipoObservacion: null,
         Observacion: null,
         Adjunto: vDoc
      }
       
   }

   SetFormData(prmData: any): void {
      return;  
   }

   Load(): void {
      return;
   }

   Loading(): boolean {
      return false;
   }

   Save(): void {
      this.Saved = true

      if (this.ValidateForm())
      { 
         this.Close(this.Result)
      }
   }

   onTipoObservacionChange() {
       this.Result.Observacion = this.Result?.TipoObservacion?.Texto ?? '';

   }
   
 
   readonly ModalUIConfig = {

       [ConfirmarAccionTipo.ENVIAR]: {
           PrefixHeader: 'Enviar',
       },

       [ConfirmarAccionTipo.VISAR]: {
           PrefixHeader: 'Visar',
       },
       [ConfirmarAccionTipo.OBJETAR]: {
           PrefixHeader: 'Objetar',
       },
       [ConfirmarAccionTipo.RECHAZAR]: {
           PrefixHeader: 'Rechazar',
       },
       [ConfirmarAccionTipo.ANULAR]: {
           PrefixHeader: 'Anular',
       },
       [ConfirmarAccionTipo.GUARDAR]: {
           PrefixHeader: 'Guardar',
       }
   };

  

}

export enum ConfirmarAccionTipo {
   ENVIAR =0,
   VISAR = 1,
   OBJETAR = 2,
   RECHAZAR = 3,
   ANULAR = 4,
   GUARDAR = 10
}

export interface ConfirmarAccionResultado { 
   TipoObservacion: { Id: number, Nombre: string, Texto: string } | null,
   Observacion: string | null,
   Adjunto: Documento | null
}

export interface ConfirmarAccionOptions {
   TipoAccion?: ConfirmarAccionTipo,
   Titulo?: string,
   TiposObservacion?: { Id: number, Nombre: string, Texto: string }[],
   ObservacionRequerida?: boolean,
   ArchivoRequerido?: boolean,
   TipoObservacionRequerido?: boolean
}


