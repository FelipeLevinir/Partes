import { RUT } from '@/helpers/interfaces/RUT';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Optional, Output, Self, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormsModule, NgControl, NgModel, ValidationErrors } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { InputNumberDirective } from '../input-number/input-number.directive';

@Component({
  selector: 'input-rut',
  imports: [FormsModule,
            CommonModule,
            TooltipModule,
            InputTextModule,
            InputNumberDirective
  ],
  templateUrl: './input-rut.component.html',
  styleUrl: './input-rut.component.scss'
})
export class InputRutComponent implements OnInit, ControlValueAccessor {
   @Input() id: string | null = null;
   @Input() name: string | null = null;
   @Input() required: any;
   isDisabled: boolean = false;
   isParentDisabled: boolean = false;

   Value: RUT = { Numero: null, DV: null };

   onChangeFn = (_: any) => { }
   onTouchFn = () => { }

   @Output() onValidRUT: EventEmitter<boolean> = new EventEmitter<boolean>();

   @ViewChild("RUTNumero") RUTNumero: NgModel | null = null;
   @ViewChild("RUTDV") RUTDV: NgModel | null = null;


   constructor(@Self() @Optional() private control: NgControl,
       private ElementRef: ElementRef ) {
       this.control.valueAccessor = this;


   }


   validate(control: AbstractControl): ValidationErrors | null {
      let vValid = true;
  
      if (
          this.required != null ||
          (this.Value?.Numero != null && this.Value.Numero !== 0) ||
          this.Value?.DV != null
      ) {
          vValid = this.IsValid();
      }
  
      return !vValid ? { invalidRUT: "RUT no válido" } : null;
  }
  



   writeValue(obj: any): void {
       if (obj) {
           this.Value = obj;
       }
       else {
           this.Value.Numero = null;
           this.Value.DV = null;
       };
   }

   registerOnChange(fn: any): void {
       this.onChangeFn = fn;
   }

   registerOnTouched(fn: any): void {
       this.onTouchFn = fn;;
   }

   setDisabledState?(isDisabled: boolean): void {
       if (!this.isParentDisabled) {
           this.isDisabled = isDisabled;;
       }
   }

   onValueChange() {
       this.onTouchFn();
       this.onChangeFn(this.Value)

   }

   onKeyDV(value: any) {
       return !isNaN(value.key) || value.key?.toUpperCase() == "K"

   }

   ngOnInit(): void {

       const parentElement = this.ElementRef.nativeElement.closest('fieldset')
       var vDisabled: boolean;
       
       if (parentElement) {
           vDisabled = parentElement.disabled;
           this.setDisabledState!(vDisabled);
           this.isParentDisabled = vDisabled;
       }

       if (!this.isParentDisabled) {
           this.setDisabledState!(this.ElementRef.nativeElement.disabled)
       }


       this.control.control!.addValidators(this.validate.bind(this));



   }

   IsValid(): boolean {
       var vResult: boolean = true;

       if (this.Value.Numero != null && this.Value.Numero != 0 && this.Value.DV != null) {
           var vDigitos = this.Value.Numero.toString();
           var vMultiplicador: number = 2;
           var vSuma: number = 0;
           for (let i = vDigitos.length - 1; i >= 0; i--) {
               if (vMultiplicador > 7) { vMultiplicador = 2 };

               vSuma += (parseInt(vDigitos.charAt(i)) * vMultiplicador);

               vMultiplicador += 1;
           }

           var vEntero: number = Math.floor(vSuma / 11);

           var vValor: number = 11 - (vSuma - (vEntero * 11))

           var vDV: string;
           if (vValor == 11) { vDV = '0' }
           else if (vValor == 10) { vDV = 'K' }
           else { vDV = vValor.toString() }

           if (vDV == this.Value.DV.toUpperCase()) {
               vResult = true;
           }
           else {
               vResult = false
           }


       }
       else {
           vResult = false;
       }

       return vResult;

   }

   RUTError(): string | undefined {

       return this.control?.control?.touched && !this.IsValid() ? 'RUT no válido' : undefined;
   }

}



