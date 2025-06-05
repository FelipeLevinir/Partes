import { formatNumber } from '@angular/common';
import { Directive, ElementRef, forwardRef, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
    selector: 'input[InputNumber]',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputNumberDirective),
            multi: true
        }
    ]
})
export class InputNumberDirective implements   ControlValueAccessor {
   private _value: string | undefined | number = undefined;
   @Input('value')
   set value(value: any) {
      this.onInput(value)
   }
   get value(): any {
      return this._value;
   }

   @Input() decimal: number = 0;

   onChangeFn = (_: any) => { }
   onTouchFn = () => { }


   @HostListener('input', ['$event.target.value'])
   onInput(value: string) {
      let vNumber = +parseFloat(this.strintToNumber(value)).toFixed(this.decimal);

      if (vNumber !== this._value) {
         if (isNaN(vNumber)) { this._value = undefined; }
         else { this._value = vNumber; }

         this.formatValue(vNumber);
      }


      this.onChangeFn(this._value);
   }

   @HostListener('blur')
   _onBlur() {
      this.formatValue(this._value); // add commas
      this.onTouchFn()
   }

   constructor(private elementRef: ElementRef<HTMLInputElement>) { }

   writeValue(obj: any): void {
      this._value = obj;
      this.formatValue(this._value); // format Value
   }

   registerOnChange(fn: any): void {
      this.onChangeFn = fn;
   }
   
   registerOnTouched(fn: any): void {
      this.onTouchFn = fn;
   }
   setDisabledState?(isDisabled: any): void {
      this.elementRef.nativeElement.disabled = isDisabled;
   }

   private strintToNumber(value: string): string {


      if (this.decimal && this.decimal > 0 && value.indexOf(",") > -1) {
         let vIntegerPart = value.substr(0, value.indexOf(",") + 1).replace(/\D/g, '');

         let vDecimalPart = value.substring(value.indexOf(",") + 1).replace(/\D/g, '');

         if (!vDecimalPart) { vDecimalPart = "0" };
         if (!vIntegerPart) { vIntegerPart = "0" };


         return vIntegerPart + "." + vDecimalPart;;
      }
      else {
         return value.replace(/(?!-)\D/g, '');
         //return value.replace(/(?!-)[^0-9.]/g, "")
      }

   }


   private formatValue(value: any | null) {

      if (value && isNaN(value)) {
         value = parseFloat(this.strintToNumber(value));
      }

      if (value !== "" && !isNaN(value) && value !== null) {
         this.elementRef.nativeElement.value = formatNumber(value, 'es-CL', "1.0-" + this.decimal)
      } else {
         this.elementRef.nativeElement.value = "";
      }
   }

}
