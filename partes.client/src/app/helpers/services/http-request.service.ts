import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
 import { catchError, map, Observable } from 'rxjs';
import { Response, ResponseResult } from '../interfaces/response';
import { ResponseError } from '../interfaces/response-error';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

   constructor(private readonly http: HttpClient, 
               private readonly globalService: GlobalService) {

   }

   public Get(prmUrl: string, prmDefaulErrorMessage?: string): Observable<Response> {
      let vHeader: HttpHeaders = new HttpHeaders();

      if (this.globalService?.CurrentUser) {
         vHeader = vHeader.set("Authorization", "Bearer " + this.globalService.CurrentUser.Token);
      }

      return this.http.get<Response>(prmUrl, { headers: vHeader }).pipe(
         map(value => this.GetResultData(value)),

         catchError(error => this.handleError(error, prmDefaulErrorMessage))

      );
   }

   public Post(prmUrl: string, prmData: any, prmDefaulErrorMessage?: string): Observable<Response> {
      let vHeader: HttpHeaders = new HttpHeaders();

      if (this.globalService?.CurrentUser) {
         vHeader = vHeader.set("Authorization", "Bearer " + this.globalService.CurrentUser.Token);
      }


      return this.http.post<Response>(prmUrl, prmData, { headers: vHeader }).pipe(
         map(value => this.GetResultData(value)),

         catchError(error => this.handleError(error, prmDefaulErrorMessage))

      );
   }


   private GetResultData(value: Response): Response {

      if (value.Result === undefined || value.Data === undefined || value.Warning === undefined || value.Error ===undefined) { throw ("Error: Dato retornado no soportado;") };

      if (value.Result == ResponseResult.Error) { throw (value) }

      if (value.Result == ResponseResult.OK) { return value }

      return value;

   }

   private handleError(error: any, prmDefaulErrorMessage: string = "Error llamando WebAPI"): Observable<Response> {
      if (error.Result == ResponseResult.Error && error.Error) {
         throw (error as Response);
      }

      if ((error.status == 401 || error.status == 403)) {
         if (error.error?.Tipo == ResponseResult.Error && error.error.Error) {

            let vError: Response = error.error as Response;

            throw (vError);
         }
         else {
            let vError: Response = new Response();
            vError.Error = new ResponseError("Usuario no autorizado")
            throw (vError)

         }

      }



      let vError: Response = new Response();

      vError.Error = new ResponseError(prmDefaulErrorMessage)
      
      throw (vError)

   }
}
