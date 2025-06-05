import { Component } from '@angular/core';
 

@Component({
  selector: 'panel-info-data-loading',
  templateUrl: './panel-info-data-loading.component.html',
  styleUrl: './panel-info-data-loading.component.scss',
  standalone: false
})
export class PanelInfoDataLoadingComponent {
   msgs: { severity: string; summary?: string; text: string , closable: boolean, icon?: string}[] = [];

   ngOnInit(): void {
      this.msgs = [
         { severity: 'info', text: 'Cargando datos...', closable: false, icon:'pi pi-spin pi-spinner' }
      ];
   }
}
