import { Component, Input } from '@angular/core';
 

@Component({
  selector: 'panel-info', 
  templateUrl: './panel-info.component.html',
  styleUrl: './panel-info.component.scss',
  standalone: false
  
})
export class PanelInfoComponent {
   @Input() severity: string = "info";

      _text: string  = '';
   @Input()
      public get text(): string  {return this._text }
      public set text(value: string) { this._text = value; this.SetText() }

   @Input() icon: string = "pi pi-info-circle";

   msgs: { severity: string; summary?: string; text: string , closable: boolean, icon?: string}[] = [];

   ngOnInit(): void {
      this.SetText()
   }

   SetText() {
      this.msgs = [
         { severity: this.severity, text: this.text, closable: false, icon: this.icon }
      ];
   }
}
