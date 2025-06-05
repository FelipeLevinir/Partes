import { Component, ElementRef, EventEmitter, forwardRef, OnInit, Output, ViewChild } from '@angular/core';
import { MonthPickerComponent } from '../month-picker/month-picker.component';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'range-month-picker',
  imports: [MonthPickerComponent,
            FormsModule,
            CommonModule,
            ButtonModule 
  ],
  templateUrl: './range-month-picker.component.html',
  styleUrl: './range-month-picker.component.scss',
  providers: [
   {
       provide: NG_VALUE_ACCESSOR,
       useExisting: forwardRef(() => RangeMonthPickerComponent),
       multi: true
   }
]
})
export class RangeMonthPickerComponent implements OnInit, ControlValueAccessor {


   onChangeFn = (_: any) => { }
   onTouchFn = () => { }

   filtroRango: boolean = false;

   @ViewChild("FechaInicio") FechaInicio: NgModel | undefined;
   @ViewChild("FechaTermino") FechaTermino: NgModel | undefined;

   @Output() onChange: EventEmitter<any> = new EventEmitter<any>()

   Value = { FechaInicio: null, FechaTermino: null };
   isDisabled: boolean = false;

   constructor(private ElementRef: ElementRef) { }

   ngOnInit(): void {
       this.setDisabledState!(this.ElementRef.nativeElement.disabled)
   }

   onClose() {
       this.onTouchFn();
       this.FechaInicio!.control.markAsTouched();
       this.FechaTermino!.control.markAsTouched();

   }

   onValueChange(value: Date | undefined) {
       if (value || this.FechaInicio?.control.touched || this.FechaTermino?.control.touched) {
           if (!this.filtroRango) { this.Value.FechaTermino = this.Value.FechaInicio }

           if (this.Value.FechaInicio || this.Value.FechaTermino) {
               this.onTouchFn();
               this.onChangeFn(this.Value);
               this.onChange.emit(this.Value)
           }
       }

   }


   writeValue(obj: any): void {
      if (obj != undefined) { this.Value = obj };
   }

   registerOnChange(fn: any): void {
      this.onChangeFn = fn;
   }

   registerOnTouched(fn: any): void {
      this.onTouchFn = fn;;
   }

   setDisabledState?(isDisabled: boolean): void {
      this.isDisabled = isDisabled;;
   }

   filtrarRango(value: boolean) {
      this.filtroRango = value;

      if (!this.filtroRango) {
         this.Value.FechaTermino = this.Value.FechaInicio
      }

      this.onValueChange(undefined)

   }
}
