import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Evento {
  ceremoniaLugar: string;
  ceremoniaDireccion: string;
  recepcionLugar: string;
  recepcionDireccion: string;
  horaLLegada: string;
  horaCeremonia: string;
  horaRecepcion: string;
  horaCena: string;
  horaFiesta: string;
  terminoFiesta: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private apiUrl = 'https://partes.onrender.com/evento'; 

  constructor(private http: HttpClient) {}

  getEvento(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.apiUrl);
  }
}
