import { Tipo } from "./tipo";

 
export interface Componente {
    Id: number;
    Nombre: string;
    HtmlId: string;
    Tipo: Tipo;
}
