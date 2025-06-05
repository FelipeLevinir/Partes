import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'panel-info-form-invalid',
  templateUrl: './panel-info-form-invalid.component.html',
  styleUrl: './panel-info-form-invalid.component.scss',
  standalone: false
})
export class PanelInfoFormInvalidComponent {
   @Input("form") DataForm: NgForm | null = null;
   Submitted: boolean = false;
   msgs: { severity: string; text: string , closable: boolean, icon?: string}[] = [];

   ngOnInit(): void {
      this.DataForm?.ngSubmit.subscribe((value) => {
          this.DataForm?.control.markAllAsTouched();
          this.Submitted = true;
      })

      this.msgs = [
          { severity: 'error', text: 'Faltan datos en el formulario', closable: false, icon: 'pi pi-times-circle' }
      ];
  }

}
