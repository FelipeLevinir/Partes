import { Response } from '@/helpers/interfaces/response';
import { HttpRequestService } from '@/helpers/services/http-request.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonsService {

   constructor(private readonly HttpRequest: HttpRequestService) { }

   public TipoSexoGetItems(): Observable<Response> {
      return this.HttpRequest.Get(environment.apiLibraryURL + "Commons/TipoSexo/GetItems", "Error recuperando");
   }
}
