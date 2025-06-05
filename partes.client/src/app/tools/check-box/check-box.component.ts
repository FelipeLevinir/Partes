import { Component, ElementRef, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'check-box',
  imports: [FormsModule,
            CheckboxModule
  ],
  templateUrl: './check-box.component.html',
  styleUrl: './check-box.component.scss',
  providers: [
   {
       provide: NG_VALUE_ACCESSOR,
       useExisting: forwardRef(() => CheckBoxComponent),
       multi: true
   }
]
})

export class CheckBoxComponent implements OnInit, ControlValueAccessor {
   @Input() id: string | undefined;
   @Input() name: string | undefined;
   @Input() required: any;

   Value: any;
   isDisabled: boolean = false;
   isParentDisabled: boolean = false;

   onChangeFn = (_: any) => { }
   onTouchFn = () => { }

   constructor(private ElementRef: ElementRef) { }

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
   }

   onValueChange(value: any) {
      this.onTouchFn();
      this.onChangeFn(this.Value)
   }

   writeValue(obj: any): void {
      this.Value=obj
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