import { Parametros } from '@/helpers/interfaces/parametros';
import { Injectable } from '@angular/core';
import { ComponentePermiso } from '../interfaces/componente-permiso';
import { Usuario } from '../classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
   public Parametros: Parametros;
 
   constructor() {
       this.Parametros = new Parametros;

       let vParemetrosString: string | null = localStorage.getItem("Parametros");
       if (!vParemetrosString) {
           this.SaveParametros();
       }
       else {
           let vParametrosJSON = JSON.parse(vParemetrosString);
           Object.assign(this.Parametros, vParametrosJSON);

       }
   }

   public SaveParametros() {
       localStorage.setItem('Parametros', JSON.stringify(this.Parametros))
   }


   private _CurrentUser: Usuario | null = null;

   public set CurrentUser(value: Usuario | null) {
       this._CurrentUser = value;
       if (this._CurrentUser) { sessionStorage.setItem("CurrentUser", JSON.stringify(this._CurrentUser)) }
       else { sessionStorage.removeItem("CurrentUser") }

   }

   public get CurrentUser(): Usuario | null {
       if (this._CurrentUser) {
           return this._CurrentUser;
       }

       let vCurrentUserString: string | null = sessionStorage.getItem("CurrentUser");
       if (!vCurrentUserString) {
           return null;
       }

       let vUserJSON = JSON.parse(vCurrentUserString);
       let vUser: Usuario = new Usuario;

       Object.assign(vUser, vUserJSON);

       if (vUser.Token) {
           this.CurrentUser = vUser;
           return this._CurrentUser;
       }

       return null
   }

    
   public CheckRoute(prmRouteUrl: string): boolean {
      const vPermiso = this.CurrentUser?.Privilegios?.Permisos.find((value: ComponentePermiso) => {
          return value?.Componente?.Tipo?.Id === 5 && prmRouteUrl?.startsWith(value?.Componente?.HtmlId);
      });
      
      return vPermiso?.Permiso?.Id === 1;
  }

}
