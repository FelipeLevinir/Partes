import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'drop-down',
  imports: [CommonModule,
            FormsModule,
            MultiSelectModule,
            SelectModule],
  templateUrl: './drop-down.component.html',
  styleUrl: './drop-down.component.scss',
  providers: [
   {
       provide: NG_VALUE_ACCESSOR,
       useExisting: forwardRef(() => DropDownComponent),
       multi: true
   }
]
})
export class DropDownComponent {
  

   @Input() id: string | undefined;
   @Input() name: string | undefined;
   @Input() required: any;
   @Input() multiselect: boolean = false;

   _options: any[] = []

   @Input()
   get options(): any[] { return this._options }
   set options(value: any[]) {
       this._options = value;
       if (this.options?.length > 10) { this.filter = true; }
   }

   @Input() optionLabel: string | undefined;;
   @Input() placeholder: string ="Seleccione...";
   @Input() filter: boolean = false;
   @Input() showClear: boolean = false;

   @Output() onChange: EventEmitter<any> = new EventEmitter<any>()

   @ViewChild('dropdown', { static: true }) dropdown!: NgModel;
  

   @Input() IdField: string = "Id";

   Focus: boolean = false;

   Value: any;
   isDisabled: boolean = false;
   isParentDisabled: boolean = false;
   es: any;

   onChangeFn = (_: any) => { }
   onTouchFn = () => { }

   constructor(private ElementRef: ElementRef) { }

   ngOnInit(): void {

       const parentElement = this.ElementRef.nativeElement.closest('fieldset')
       let vDisabled: boolean;
       
       if (parentElement) {
           vDisabled = parentElement.disabled;
           this.setDisabledState!(vDisabled);
           this.isParentDisabled = vDisabled;
       }

       if (!this.isParentDisabled) {
           this.setDisabledState!(this.ElementRef.nativeElement.disabled)
       }

   }

   onClose() {
       this.onTouchFn();
       this.dropdown!.control.markAsTouched();

   }

   onValueChange(value: any) {
      
           this.onTouchFn();
           this.onChangeFn(this.Value);
           this.onChange.emit(value)
       

   }
   public get invalid(): boolean {
       return false;
   }

   writeValue(obj: any): void {
       if (obj && obj.hasOwnProperty('Id') && obj.Id == 0 && obj.hasOwnProperty('Nombre') && !obj.Nombre) {
           this.Value = null;
       }
       else {

           if (obj) { this.Value = obj }
           ;
       }

   }
   registerOnChange(fn: any): void {
       this.onChangeFn = fn;
   }
   registerOnTouched(fn: any): void {
       this.onTouchFn = fn;
   }
   setDisabledState?(isDisabled: boolean): void {
       if (!this.isParentDisabled) {
           this.isDisabled = isDisabled;;
       }

   }

}
