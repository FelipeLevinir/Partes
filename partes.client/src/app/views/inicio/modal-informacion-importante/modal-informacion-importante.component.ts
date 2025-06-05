import { Modal } from '@/helpers/modal/classes/modal';
import { ModalModule } from '@/helpers/modal/modal.module';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-informacion-importante',
  imports: [FormsModule,            
            CommonModule,  
            ModalModule],
  templateUrl: './modal-informacion-importante.component.html',
  styleUrl: './modal-informacion-importante.component.scss'
})
export class ModalInformacionImportanteComponent extends Modal{

  informacionImportante: string = "La iglesia cuenta con un amplio estacionamiento para todos los asistentes, y el centro de eventos ofrece estacionamiento privado para su comodidad. No se preocupe por buscar un lugar, tenemos todo cubierto.";

  constructor(){
    super();
  }

  ngOnInit(): void {
    this.header = 'Información Importante';
  }

  SetFormData(prmData: any): void {}

  Load(): void { return; }

  Loading() { return; }

  Save(): void {}
}
