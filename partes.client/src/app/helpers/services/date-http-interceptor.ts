import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";

@Injectable({
   providedIn: 'root'
 })
export class DateHttpInterceptor implements HttpInterceptor {
   iso8601RegExp: RegExp = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/;


   public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(req).pipe(
         tap((event: HttpEvent<any>) => {
               if (event instanceof HttpResponse) {
                  const body = event.body;
                  this.convertToDate(body);
               }
         }),
      );
   }

   convertToDate(body: any) {
      if (body === null || body === undefined) {
         return body;
      }

      if (typeof body !== 'object') {
         return body;
      }

      for (const key of Object.keys(body)) {
         const value = body[key];
         if (typeof value === 'object') {
               this.convertToDate(value);
         }
         else if (this.isIso8601(value)) {
            let vDate = this.toDateTZ(value);

            if (vDate.getFullYear() > 1) { body[key] = vDate }
            else { delete body[key] }

         }
      }


   }

   isIso8601(value: any) {
      if (value === null || value === undefined) {
         return false;
      }
      let vResult = this.iso8601RegExp.test(value)

      return vResult;
   }

   public toDateTZ(prmDateValue: string): Date {
      let vYear = parseInt(prmDateValue.substring(0, 4));
      let vMonth = parseInt(prmDateValue.substring(5, 7)) - 1;
      let vDay = parseInt(prmDateValue.substring(8, 10));
      let vHour = parseInt(prmDateValue.substring(11, 13));
      let vMinutes = parseInt(prmDateValue.substring(14, 16));
      let vSeconds = parseInt(prmDateValue.substring(17, 19));

      let vDate: Date


      if (vYear == 1) {
         vDate = new Date(prmDateValue);
      }
      else {
         vDate = new Date(vYear, vMonth, vDay, vHour, vMinutes, vSeconds);

      }


      if (prmDateValue.toUpperCase().endsWith("Z")) {
         return new Date(vDate.getTime() + vDate.getTimezoneOffset() * 60000)
      }
      else {
         return vDate;
      }

   }
}
