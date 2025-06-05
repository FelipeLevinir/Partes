import { ResponseError } from '@/helpers/interfaces/response-error';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'panel-info-warning',
  templateUrl: './panel-info-warning.component.html',
  styleUrl: './panel-info-warning.component.scss',
  standalone: false
})
export class PanelInfoWarningComponent {
   @Input() Warning: ResponseError | undefined;
}
