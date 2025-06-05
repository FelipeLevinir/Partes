import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { catchError, firstValueFrom, map, of } from 'rxjs';
import { GlobalService } from '../services/global.service';


@Pipe({
  name: 'authImage',
  standalone: true
})
export class AuthImagePipe implements PipeTransform {
   constructor(
        private readonly http: HttpClient,
        private readonly globalservice: GlobalService, 
    ) {

   }

   async transform(src: string): Promise<string | undefined> {
      const token = this.globalservice.CurrentUser?.Token;

      const headers = new HttpHeaders({
            'Authorization': 'Bearer '.concat(token ?? '')
      });

      const observable = this.http.get<string>(src, { headers }).pipe(
            map(value => 'data:image/jpg;base64,'.concat(value)),
            catchError(error => of('assets/layout/images/noImage.png'))
      );

      return await firstValueFrom(observable);
   }

}
