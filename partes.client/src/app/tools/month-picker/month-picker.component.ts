import { Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
 

@Component({
  selector: 'month-picker',
  imports: [DatePickerModule,
            FormsModule],
  templateUrl: './month-picker.component.html',
  styleUrl: './month-picker.component.scss',
  providers: [
   {
       provide: NG_VALUE_ACCESSOR,
       useExisting: forwardRef(() => MonthPickerComponent),
       multi: true
   }
]
})
export class MonthPickerComponent {
   @Input() id: string | undefined;
   @Input() name: string | undefined;
   @Input() required: any;
   @Input() minDate: Date | undefined;
   @Input() maxDate: Date | undefined;

   Rango: string = "1900:2100";
       
   @ViewChild('Fecha', { static: true }) Fecha!: NgModel;

   @Output() onChange: EventEmitter<any> = new EventEmitter<any>()

   Value: Date | undefined;
   isDisabled: boolean = false;
   es: any;

   onChangeFn = (_: any) => { }
   onTouchFn = () => { }


   constructor(private ElementRef: ElementRef) { }

   ngOnInit(): void {
              
       if (this.minDate) {
           this.Rango = this.minDate.getFullYear().toString() + ":"
       }
       else {
           this.Rango = "1900:"
       }

       if (this.maxDate) {
           this.Rango += this.maxDate.getFullYear().toString()
       }
       else {
           this.Rango += "2100"
       }

       this.setDisabledState!(this.ElementRef.nativeElement.disabled)
   }

   onClose() {
       this.onTouchFn();
       this.Fecha!.control.markAsTouched();
   }

   onValueChange(value: Date) {
       if (value || this.Fecha?.control.touched) {
           if (this.Value) { 
               this.Value.setDate(1);
           };

           this.onTouchFn();
           this.onChangeFn(this.Value);
           this.onChange.emit(this.Value)
       }

   }

   onSelect(value?: Date) {
       if (value || this.Fecha?.control.touched) {
           if (this.Value) {
               this.Value.setDate(1);
           };
           this.onTouchFn();
           this.onChangeFn(this.Value);
           this.onChange.emit(this.Value);
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

}
