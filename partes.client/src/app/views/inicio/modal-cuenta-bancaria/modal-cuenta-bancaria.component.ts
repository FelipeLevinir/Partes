import { Modal } from '@/helpers/modal/classes/modal';
import { ModalModule } from '@/helpers/modal/modal.module';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-cuenta-bancaria',
  imports: [FormsModule,            
            CommonModule,  
            ModalModule],
  templateUrl: './modal-cuenta-bancaria.component.html',
  styleUrl: './modal-cuenta-bancaria.component.scss'
})
export class ModalCuentaBancariaComponent extends Modal{

  titularCuentaBancaria = 'Felipe Leviñir';
  rut = '19.362.911-3';
  tipoCuenta = 'Cuenta Corriente';
  nombreBanco = 'Banco Chile';
  numeroCuenta = '001014209610';
  correoBanco = 'levinir.f@gmail.com';

  constructor(){
    super();
  }

  ngOnInit(): void {
    this.header = 'Cuenta Bancaria';
  }

  copiarDatos(): void {
    const texto = `
                  ${this.titularCuentaBancaria}
                  ${this.rut}
                  ${this.tipoCuenta}
                  ${this.nombreBanco}
                  ${this.numeroCuenta}
                  ${this.correoBanco}
                  `.trim();  
    navigator.clipboard.writeText(texto).then(() => {
      alert('Datos copiados al portapapeles ✅');
    }).catch(err => {
      console.error('Error al copiar', err);
      alert('No se pudo copiar ❌');
    });
  }
  

  SetFormData(prmData: any): void {}

  Load(): void { return; }

  Loading() { return; }

  Save(): void {}

}
