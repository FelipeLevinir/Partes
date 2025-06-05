import { Response } from '@/helpers/interfaces/response';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

   constructor() { }

   TrackingGetItem(prmDataId: number): Observable<Response> | null { return null}
}
