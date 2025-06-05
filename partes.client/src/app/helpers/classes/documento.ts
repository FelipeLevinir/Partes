import { EventEmitter } from "@angular/core";
import { Tipo } from "../interfaces/tipo";

export class Documento {
   Id: number =-1;
   Tipo: Tipo | null = null;;
   Nombre: string | null = null;
   Archivo: File | null = null;
   ContentType: string | null = null;

   constructor() { }


   #onSucces: EventEmitter<Documento> = new EventEmitter<Documento>();
   get onSucces(): EventEmitter<Documento> { return this.#onSucces }
   set onSucces(value: EventEmitter<Documento>) {
      this.#onSucces = value;
   }

   #onError: EventEmitter<Documento> = new EventEmitter<Documento>();
   get onError(): EventEmitter<Documento> { return this.#onError }
   set onError(value: EventEmitter<Documento>) {
      this.#onError = value;
   }
     

}

