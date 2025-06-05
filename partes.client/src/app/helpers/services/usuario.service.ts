import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestService } from './http-request.service';
import { Usuario } from '../classes/usuario';
import { Response } from '../interfaces/response';
import { environment } from 'src/environments/environment.prod';
 

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

   constructor(private readonly HttpRequest: HttpRequestService) { }


   public Login(prmUsuario: Usuario): Observable<Response> {
      prmUsuario.Privilegios = {
         Sistema: { Id: environment.SistemaId, Nombre: '' },
         Permisos: [],
         Rol: { Id: 0, Nombre: '' },
      }

      return this.HttpRequest.Post(environment.apiSSOURL + "Usuario/Login", prmUsuario, "Error interno validando credenciales");
   }

  
   public LoginFromEV(prmUsuarioEV: string): Observable<Response> {

      let vUserEV = { Token: prmUsuarioEV }
      return this.HttpRequest.Post(environment.apiSSOURL + "Usuario/LoginFromEV", vUserEV, "Error interno validando credenciales EV");
   }

}
