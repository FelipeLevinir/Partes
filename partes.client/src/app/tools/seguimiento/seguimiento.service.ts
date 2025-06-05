import { UtilitiesService } from '@/helpers/services/utilities.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeguimientoService {

   constructor(private readonly utilitiesService: UtilitiesService) { }

   public SeguimientoAdjuntoGetItem(prmDocumentoId: number) {
      let url = environment.apiURL + "SolicitudSeguimiento/GetDocumentoByUsuario/" + prmDocumentoId;
      this.utilitiesService.OpenSecureFile(url, true)
   }

}
