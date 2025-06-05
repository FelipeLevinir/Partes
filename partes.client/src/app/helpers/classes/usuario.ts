import { Rol } from "../interfaces/rol";
import { SistemaPermisos } from "../interfaces/sistema-permisos";

 

 
export class Usuario {

   public UserName: string | undefined;
   public Password: string | undefined;
   public Rol: Rol | undefined;
   public Activo: boolean = true;
   public CustomData: any;
   public Token: string | undefined;
   public Privilegios: SistemaPermisos | null = null;
   public Nombre: string | undefined;
   public Persona: any;
   
   
}
