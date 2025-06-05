import { Component, EventEmitter, KeyValueDiffers, Output, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import Swal, { SweetAlertResult } from "sweetalert2";
import { ModalFooterDirective } from "../directives/modal-footer.directive";
import { IModal } from "./imodal"; 
import { ObjectDiffer } from "./object-differ";
 

@Component({template:''} )
export abstract class Modal implements IModal {

   abstract SetFormData(prmData: any): void;
   abstract Load(): void;
   abstract Loading(): any
   abstract Save(): void;
      

   @ViewChild("ModalForm") ModalForm: NgForm | null = null;

   @ViewChild(ModalFooterDirective) public Footer: ModalFooterDirective | null = null;

 
   public Differs: KeyValueDiffers | null = null;

   objectDiffer: ObjectDiffer | null = null;
   
   _header: string | null = null;
   
   get header(): string | null { return this._header }

   set header(value: string) {
      this._header = value;
      this.headerChange.emit(value)
   };

   @Output() headerChange: EventEmitter<string> = new EventEmitter<string>();

   onClose: EventEmitter<any> = new EventEmitter();

   InputData: any;

   Result: any;

   set ObservableData(value: any) {
      if (value) {
         this.objectDiffer = ObjectDiffer.CreateDiffer(value, this.Differs!);
      }
   }


   Saving: boolean = false;

   _Saved: boolean = false;
   set Saved(value: boolean) {
      if (value) {
         this.objectDiffer?.SaveChanges();
      };

      this._Saved = value;
   }

   get Saved(): boolean {
      if (this._Saved) {
         this._Saved = !this.objectDiffer?.GetChanges()
      }

      return this._Saved;
   }


   public ValidateForm() : boolean
   {
      this.ModalForm!.ngSubmit.emit();
      this.ModalForm!.control.markAllAsTouched();

      return !this.ModalForm!.invalid
   }

   public Close(result?: any) {
      if (this.Saved || !this.ModalForm || this.ModalForm.pristine) {
         this.Result = result;
         this.onClose.emit(result)
      }
      else {

         Swal.fire({
               title: "Advertencia",
               text: "¿Desea salir sin guardar los cambios?",
               icon: 'warning',
               showCancelButton: true,
               confirmButtonText: 'SÍ, salir!',
               cancelButtonText: "Cancelar",
               confirmButtonColor: '#3085d6',
               
         }
         ).then((result: SweetAlertResult) => {
               if (result.value) {
                  this.Result = false;
                  this.onClose.emit(false)
               }
         })
      };


   }




}
