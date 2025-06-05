import { Documento } from '@/helpers/classes/documento';
import { UtilitiesService } from '@/helpers/services/utilities.service';
import { LayoutService } from '@/layout/service/layout.service';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'documento',
  imports: [FormsModule,
            CommonModule,
            ButtonModule,
            RippleModule,
            TooltipModule,
            MessageModule
  ],
  templateUrl: './documento.component.html',
  styleUrl: './documento.component.scss'
})
export class DocumentoComponent {
   @Input() Invalid: boolean | undefined = false;
   @Input("Documento") Documento: Documento | null = null;
   @Output() DocumentoChange: EventEmitter<Documento> = new EventEmitter<Documento>();

   @Input("BrowseDisabled") BrowseDisabled: boolean = false;
   @Input("UploadDisabled") UploadDisabled: boolean = false;
   @Input("DeleteDisabled") DeleteDisabled: boolean = false;
   @Input("ReadOnly") ReadOnly: boolean = false;

   @Output() onBrowse: EventEmitter<Documento> = new EventEmitter<Documento>();
   @Output() onUpload: EventEmitter<Documento> = new EventEmitter<Documento>();
   @Output() onDelete: EventEmitter<Documento> = new EventEmitter<Documento>();

   @ViewChild('InputFile') InputFile: ElementRef | undefined;

   @Input("LoadLocal") LoadLocal: boolean = false;

   @Input("AcceptFiles") AcceptFiles: string | undefined;

   Working: boolean = false;
 
   FileUpload: File | null = null;
   

   constructor(private readonly utilitiesService: UtilitiesService, 
               public readonly layoutService: LayoutService) { 
      
                 
      const current = this.layoutService.layoutConfig();
 
      this.layoutService.updateBodyBackground(current.primary)
                   
   }

   Upload() {

       this.InputFile?.nativeElement.click();
   }

   handleInputFile(prmFileList: FileList) {
      let vError: string;
      let vFile: File | null = prmFileList.item(0);
      if (this.AcceptFiles && this.AcceptFiles.split(",").indexOf(vFile!.type) == -1) {
         let vFiles = this.AcceptFiles.split(",").map((item) => {
            item = item.slice(item.indexOf("/") + 1)
            return item;
         })
         vError = 'Solo se pueden subir archivos ' + vFiles.join(", ");
         this.utilitiesService.ShowError(vError);

      }
      else {
         this.UploadProcess(vFile!)
      }
   }

   UploadProcess(prmFile: File) {
       if (this.LoadLocal) {
           this.FileUpload = prmFile;
           (<any>prmFile).url = URL.createObjectURL(prmFile);

           this.Documento!.Nombre = prmFile.name;
           this.Documento!.Archivo = prmFile
           this.onUpload.emit(this.Documento!)
       }
       else {

           var vDocumento: Documento = new Documento();
           Object.assign(vDocumento, this.Documento)
           vDocumento.Archivo = prmFile;

           vDocumento.onSucces.subscribe((result) => {
               Object.assign(this.Documento!, result);
               this.Working = false;
           })

           vDocumento.onError.subscribe((result) => {
               this.Working = false;
           })

           this.Working = true;
           this.onUpload.emit(vDocumento)
           
       }

       this.DocumentoChange.emit(this.Documento!);
       
       
       
   }


   Browse() {
      if (this.LoadLocal) {
         if (this.FileUpload) {
            this.utilitiesService.OpenSecureFile((<any>this.FileUpload).url, true)
            this.onBrowse.emit(this.Documento!)
         };
      }
      else {
         var vDocumento: Documento = new Documento();
         Object.assign(vDocumento, this.Documento);

         vDocumento.onSucces.subscribe((result) => {
            this.Working = false;
         })

         vDocumento.onError.subscribe((result) => {
            this.Working = false;
         })

         this.Working = true;
         this.onBrowse.emit(vDocumento);
      }

      
   }

   Delete() {
       if (this.LoadLocal) {
           this.FileUpload = null;
           this.Documento!.Id = -1;
           this.Documento!.Nombre = '';
           this.Documento!.ContentType = '';

           this.onDelete.emit(this.Documento!);
       }
       else {
           var vDocumento: Documento = new Documento();
           Object.assign(vDocumento, this.Documento);

           vDocumento.onSucces.subscribe((result) => {
               this.Working = false;
               this.FileUpload = null;
               this.Documento!.Id = -1;
               this.Documento!.Nombre = '';
               this.Documento!.ContentType = '';
               
           })

           vDocumento.onError.subscribe((result) => {
               this.Working = false;
           })
           this.Working = true;

           this.onDelete.emit(vDocumento);
       }

       this.InputFile!.nativeElement.value = null;

       this.DocumentoChange.emit(this.Documento!);
     
   }


}
