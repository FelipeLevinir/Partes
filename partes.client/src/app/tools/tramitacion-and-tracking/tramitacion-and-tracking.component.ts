import { ModalService } from '@/helpers/modal/service/modal.service';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TrackingService } from './tracking.service';

@Component({
  selector: 'tramitacion-and-tracking',
  imports: [CommonModule],
  templateUrl: './tramitacion-and-tracking.component.html',
  styleUrl: './tramitacion-and-tracking.component.scss'
})
export class TramitacionAndTrackingComponent {
   @Input() Item: any;

   ShowButton: boolean = false;

   constructor(private modalService: ModalService, private trackingService: TrackingService) {

   }

   OpenTracking() {

       this.trackingService.TrackingGetItem(this.Item.Id)?.subscribe((result) => {
          
           //this.modalService.show(ModalTrackingComponent, result.Data, 'modal-xl')
       })

   }
}
