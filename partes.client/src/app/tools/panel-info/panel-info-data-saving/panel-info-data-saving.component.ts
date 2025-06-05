import { Component } from '@angular/core';

@Component({
  selector: 'panel-info-data-saving',
  templateUrl: './panel-info-data-saving.component.html',
  styleUrl: './panel-info-data-saving.component.scss',
  standalone: false
})
export class PanelInfoDataSavingComponent {
   msgs: { severity: string; summary?: string; text: string , closable: boolean, icon?: string}[] = [];

   ngOnInit(): void {
         this.msgs = [
            { severity: 'info', text: 'Guardando datos...', closable: false, icon: 'pi pi-spin pi-spinner' }
         ];
   }
}
