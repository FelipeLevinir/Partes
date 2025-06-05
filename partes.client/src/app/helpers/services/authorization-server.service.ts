import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
 import { map, Observable } from 'rxjs';
import { Response } from '../interfaces/response';
import { environment } from 'src/environments/environment.prod';
import { HttpRequestService } from './http-request.service';
import { GlobalService } from './global.service';
 

@Injectable({
  providedIn: 'root'
})
export class AuthorizationServerService {

   constructor(private readonly http: HttpClient, 
               private readonly httpRequest: HttpRequestService, 
               private readonly globalService: GlobalService) {
   }


   public CreateRemoteSession(): Observable<Response> {
       return this.httpRequest.Get(environment.apiURL + "AuthorizationServer/CreateRemoteSession/", "Error interno recuperando token sesion remota");
   }

   public LoginRemoteSession(prmId: number, prmEntryRouteUrl: string): Observable<boolean> {

       return this.http.get(environment.apiURL + "AuthorizationServer/LoginRemoteSession/" + prmId).pipe(
           map((value: any) => {
               if (value["Tipo"] == 1) {
                   this.globalService.CurrentUser = value["Data"];
                   return this.globalService.CheckRoute(prmEntryRouteUrl);
               }
               else {
                   return false;
               };

           })

       );
   }


   public GoTo(prmURL: string) {
       this.CreateRemoteSession().subscribe({
           next: (value: Response) => {
               window.open(prmURL + "?prmToken=" + value.Data, "_blank")
           },
           error: (error: Response) => { }
       }
       )

   }
}
