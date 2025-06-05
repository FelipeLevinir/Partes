import { ComponentePermiso } from "./componente-permiso";
import { Rol } from "./rol";
import { Sistema } from "./sistema";

  
export interface SistemaPermisos {
    Sistema: Sistema;
    Rol: Rol;
    Permisos: ComponentePermiso[] ;
}
