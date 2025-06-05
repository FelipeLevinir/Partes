import { ResponseError } from '@/helpers/interfaces/response-error';
import { Component, Input } from '@angular/core';

@Component({
   selector: 'panel-info-error',
   templateUrl: './panel-info-error.component.html',
   styleUrl: './panel-info-error.component.scss',
   standalone: false 
})
export class PanelInfoErrorComponent {
   @Input() Error: ResponseError | undefined;
}
