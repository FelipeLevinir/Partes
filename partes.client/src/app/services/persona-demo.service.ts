import { Documento } from '@/helpers/classes/documento';
import { Response } from '@/helpers/interfaces/response';
import { HttpRequestService } from '@/helpers/services/http-request.service';
import { UtilitiesService } from '@/helpers/services/utilities.service';
import { ConfirmarAccionResultado } from '@/tools/modal-confirmar-accion/modal-confirmar-accion.component';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonaDemoService {

   constructor(private readonly HttpRequest: HttpRequestService,
               private readonly utilitiesService: UtilitiesService) { }


   public GetNew(): Observable<Response> {
      return this.HttpRequest.Get(environment.apiURL + "PersonaDemo/GetNew", "Error recuperando");
   }

   public DocumentoUpload(prmPersona: any, prmDocumento: Documento): Observable<Response> {
      const vData = new FormData();

      let vArchivo = prmDocumento.Archivo;
      prmDocumento.Archivo = null;

      vData.append('prmPersona', JSON.stringify(prmPersona));
      vData.append('prmDocumento', JSON.stringify(prmDocumento));
      if (vArchivo) vData.append('prmArchivo', vArchivo);
      

      return this.HttpRequest.Post(environment.apiURL + "PersonaDemo/DocumentoUpload", vData, "Error subiendo doc");
   }


   DocumentoGetItem(prmDocumentoId: number): Promise<boolean> {
      let url = environment.apiURL + 'PersonaDemo/DocumentoGetItem/' + prmDocumentoId;
      return this.utilitiesService.OpenSecureFile(url, true);
   }

   SeguimientoAdjuntoGetItem(prmDocumentoId: number): Promise<boolean> {
      let url = environment.apiURL + 'PersonaDemo/SeguimientoAdjuntoGetItem/' + prmDocumentoId;
      return this.utilitiesService.OpenSecureFile(url, true);
   }



   public GetItem(prmId: number): Observable<Response> {
      return this.HttpRequest.Get(environment.apiURL + "PersonaDemo/GetItem/" + prmId, "Error recuperando");
   }


   public Save(prmItem: any): Observable<Response> {


      return this.HttpRequest.Post(environment.apiURL + "PersonaDemo/Save", prmItem, "Error guardando");
   }


   public GetItems(): Observable<Response> {
      return this.HttpRequest.Get(environment.apiURL + "PersonaDemo/GetItems", "Error recuperando");
   }


   public Enviar(prmPersona: any, prmSeguimiento: ConfirmarAccionResultado): Observable<Response> {
      //ConfirmarAccionResultado tiene la misma forma que SolicitudSeguimiento
      const vData = new FormData();

      let vArchivo = prmSeguimiento?.Adjunto?.Archivo;
      prmSeguimiento.Adjunto!.Archivo = null;

      vData.append('prmPersona', JSON.stringify(prmPersona));
      vData.append('prmSeguimiento', JSON.stringify(prmSeguimiento));

      if (vArchivo) vData.append('prmAdjunto', vArchivo);

      return this.HttpRequest.Post(environment.apiURL + "PersonaDemo/Enviar", vData, "Error subiendo doc");
   }


   public Visar(prmPersona: any, prmSeguimiento: ConfirmarAccionResultado): Observable<Response> {
      //ConfirmarAccionResultado tiene la misma forma que SolicitudSeguimiento
      const vData = new FormData();

      let vArchivo = prmSeguimiento?.Adjunto?.Archivo;
      prmSeguimiento.Adjunto!.Archivo = null;

      vData.append('prmPersona', JSON.stringify(prmPersona));
      vData.append('prmSeguimiento', JSON.stringify(prmSeguimiento));
      if (vArchivo) vData.append('prmAdjunto', vArchivo);
    

      return this.HttpRequest.Post(environment.apiURL + "PersonaDemo/Visar", vData, "Error subiendo doc");
   }

   public Objetar(prmPersona: any, prmSeguimiento: ConfirmarAccionResultado): Observable<Response> {
      //ConfirmarAccionResultado tiene la misma forma que SolicitudSeguimiento
 
      const vData = new FormData();

      let vArchivo = prmSeguimiento?.Adjunto?.Archivo;
      prmSeguimiento.Adjunto!.Archivo = null;

      vData.append('prmPersona', JSON.stringify(prmPersona));
      vData.append('prmSeguimiento', JSON.stringify(prmSeguimiento));
      if (vArchivo) vData.append('prmAdjunto', vArchivo);
   

      return this.HttpRequest.Post(environment.apiURL + "PersonaDemo/Objetar", vData, "Error subiendo doc");
   }

   public Rechazar(prmPersona: any, prmSeguimiento: ConfirmarAccionResultado): Observable<Response> {
      //ConfirmarAccionResultado tiene la misma forma que SolicitudSeguimiento
      const vData = new FormData();

      let vArchivo = prmSeguimiento?.Adjunto?.Archivo;
      prmSeguimiento.Adjunto!.Archivo = null;

      vData.append('prmPersona', JSON.stringify(prmPersona));
      vData.append('prmSeguimiento', JSON.stringify(prmSeguimiento));
      if (vArchivo) vData.append('prmAdjunto', vArchivo);
  

      return this.HttpRequest.Post(environment.apiURL + "PersonaDemo/Rechazar", vData, "Error subiendo doc");
   }

   public Anular(prmPersona: any, prmSeguimiento: ConfirmarAccionResultado): Observable<Response> {
      //ConfirmarAccionResultado tiene la misma forma que SolicitudSeguimiento
 
      const vData = new FormData();

      let vArchivo = prmSeguimiento?.Adjunto?.Archivo;
      prmSeguimiento.Adjunto!.Archivo = null;

      vData.append('prmPersona', JSON.stringify(prmPersona));
      vData.append('prmSeguimiento', JSON.stringify(prmSeguimiento));
      if (vArchivo) vData.append('prmAdjunto', vArchivo);
 

      return this.HttpRequest.Post(environment.apiURL + "PersonaDemo/Anular", vData, "Error subiendo doc");
   }


   public TrackingGetItem(prmId: number): Observable<Response> {
      return this.HttpRequest.Get(environment.apiURL + "PersonaDemo/TrackingGetItem/" + prmId, "Error recuperando");
   }


   public TipoObservacionRechazarGetItems(): Observable<Response> {
      return this.HttpRequest.Get(environment.apiURL + "PersonaDemo/TipoObservacionRechazarGetItems", "Error recuperando");
   }

   public TipoObservacionObjetarGetItems(): Observable<Response> {
      return this.HttpRequest.Get(environment.apiURL + "PersonaDemo/TipoObservacionObjetarGetItems", "Error recuperando");
   }
}
