import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseError } from '../interfaces/response-error';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { FormGroup, NgForm, NgModel } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { RUT } from '../interfaces/RUT';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

   constructor(private readonly globalService: GlobalService, 
               private readonly http: HttpClient) { }


   public CompareById(c1: any, c2: any) {
       return c1 && c2 ? c1.Id === c2.Id : c1 === c2;
   }

   public TrackById(index: any, item: any) {
       return item.Id;;
   }


   public GetHTMLError(prmMessage: string, prmErrorList?: string[]): string {
      let vError: string = "";

      if (prmMessage && prmMessage.trim() != '' && prmMessage.toUpperCase() != "ERROR") { vError = '<h5>' + prmMessage + "</h5>" };

      if (prmErrorList) {
         vError = vError + '<ul>';
         for (let vItem of prmErrorList) {
            if (vItem.trim() != '') { vError = vError + '<li class="text-left text-xl">' + vItem + '</li>'; }
         }
         vError = vError + '</ul>';
      }

      return vError;
   }

   public ShowResponseError(prmError: ResponseError): Promise<SweetAlertResult> {
      let vError: string = this.GetHTMLError(prmError.Message, prmError.ErrorList);

      return Swal.fire({
         title: "Error",
         html: vError,
         icon: 'error',
         confirmButtonColor: '#3085d6',
      })

   }


   public ShowError(prmMessage: string, prmErrorList?: string[]): Promise<SweetAlertResult> {

      let vError: string = this.GetHTMLError(prmMessage, prmErrorList);

      return Swal.fire({
         title: "Error",
         html: vError,
         icon: 'error',
         confirmButtonColor: '#3085d6',
      })
   }

   public ShowOK(prmTitle: string, prmText: string): Promise<SweetAlertResult> {
      return Swal.fire({
         title: prmTitle,
         text: prmText,
         icon: 'success',
         confirmButtonColor: '#3085d6',
      })
   }

   public ShowOKRegistroGuardado(): Promise<SweetAlertResult> {
       return Swal.fire({
           title: 'Éxito',
           text: 'Registro guardado satisfactoriamente',
           icon: 'success',
           confirmButtonColor: '#3085d6'
       }
       )
   }


   public ShowWarningRegistroGuardado(prmMessage: string, prmErrorList?: string[]): Promise<SweetAlertResult> {
      let vError: string = '<h4>Registro guardado, pero con advertencias</h4> '

      vError = vError + this.GetHTMLError(prmMessage, prmErrorList);

      return Swal.fire({
         title: 'Atención',
         html: vError,
         icon: 'warning',
         confirmButtonColor: '#3085d6'
      })
   }

   public ShowWarning(prmMessage: string, prmErrorList?: string[]): Promise<SweetAlertResult> {
       var vError = this.GetHTMLError(prmMessage, prmErrorList);

       return Swal.fire({
           title: 'Atención',
           html: vError,
           icon: 'warning',
           confirmButtonColor: '#3085d6',
       }
       )
   }

   public ShowPregunta(prmTitulo: string, prmMensaje?: string, prmMensajeBotonConfirmar?: string, prmMensajeBotonCancelar?: string): Promise<SweetAlertResult> {
       return Swal.fire({
           title: prmTitulo,
           html: prmMensaje,
           confirmButtonText: prmMensajeBotonConfirmar ?? 'Si',
           cancelButtonText: prmMensajeBotonCancelar ??  'No',
           showCancelButton: true,
           confirmButtonColor: '#3085d6'

       });
   }


 

   public async OpenSecureFile(prmUrl: string, prmNewTab?: boolean): Promise<boolean> {
      try {
         const user = this.globalService.CurrentUser;
         let headers = new HttpHeaders();

         if (user?.Token) {
            headers = headers.set("Authorization", `Bearer ${user.Token}`);
         }

         const response = await firstValueFrom(
            this.http.get<Blob>(prmUrl, {
            headers,
            responseType: 'blob' as 'json',
            observe: 'response'
            })
         );

         // Extraer nombre de archivo
         const contentDisposition = response.headers.get('Content-Disposition') || '';
         const match = contentDisposition.match(/filename="?([^"]+)"?/);
         const fileName = match?.[1] ?? 'documento.pdf';

         // Crear blob
         const blob = new Blob([response.body!], {
            type: response.headers.get('Content-Type') || 'application/octet-stream'
         });

         const objectUrl = URL.createObjectURL(blob);
         const link = document.createElement('a');
         link.href = objectUrl;

         if (prmNewTab) {
            link.target = '_blank';
         } else {
            link.download = fileName;
         }

         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
         URL.revokeObjectURL(objectUrl);

         return true;
      } catch (error) {
         this.ShowError("Error recuperando archivo");
         return false;
      }
   }



   public async OpenSecureFileWithData(prmUrl: string, prmData: any, prmNewTab?: boolean): Promise<boolean> {
      try {
         let headers = new HttpHeaders();
         const user = this.globalService.CurrentUser;
      
         if (user?.Token) {
            headers = headers.set("Authorization", `Bearer ${user.Token}`);
         }
      
         const response = await firstValueFrom(
            this.http.post<Blob>(prmUrl, prmData, {
               headers,
               responseType: 'blob' as 'json',
               observe: 'response'
            })
         );
      
         const contentDisposition = response.headers.get('Content-Disposition') || '';
         const match = contentDisposition.match(/filename="?([^"]+)"?/);
         const fileName = match?.[1] || 'archivo.pdf';
      
         const blob = new Blob([response.body!], {
            type: response.headers.get('Content-Type') || 'application/octet-stream'
         });
      
         const objectUrl = URL.createObjectURL(blob);
         const link = document.createElement('a');
         link.href = objectUrl;
      
         if (prmNewTab) {
            link.target = "_blank";
         } else {
            link.download = fileName;
         }
      
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
         URL.revokeObjectURL(objectUrl);
      
         return true;
         
      } catch (error) {

         this.ShowError("Error recuperando archivo");
      
         return false;
      }
    }
    
   MostrarCaptchaBadge() {
      let element = document.getElementsByClassName('grecaptcha-badge');
      if (element) {
          if (element[0]) {
              element[0].setAttribute('id', 'grecaptcha_badge');
              document.getElementById('grecaptcha_badge')!.style.visibility = 'visible';
              document.getElementById('grecaptcha_badge')!.style.opacity = '1';
          }

      }
   }

   OcultarCaptchaBadge() {
         let element = document.getElementsByClassName('grecaptcha-badge');
         if (element) {
            if (element[0]) {
               element[0].setAttribute('id', 'grecaptcha_badge');
               document.getElementById('grecaptcha_badge')!.style.visibility = 'hidden';
               document.getElementById('grecaptcha_badge')!.style.opacity = '0';
            }

         }
   }


   saveAsExcelFile(vDataRecords: any, fileName: string): void {
      let buffer = null;

      import("xlsx").then(xlsx => {
         const worksheet = xlsx.utils.json_to_sheet(vDataRecords);
         const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
         buffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
         xlsx.writeFileXLSX(workbook, fileName + '.xlsx')

      });

   }
 
   public DetectarFormularioInvalido(prmModalForm: NgForm, prmNgModelGroupLabel: string): boolean {
      const pestanhaFormGroup = prmModalForm?.form.controls[prmNgModelGroupLabel] as FormGroup;
    
      if (!pestanhaFormGroup) return false;
    
      return Object.values(pestanhaFormGroup.controls).some(control => {
        const errors = control.errors;
        return control.invalid && control.touched && errors?.['required'];
      });
   }
    

   public overrideDate() {
       const toIsoString = (date: Date) => {
           const pad = (number: number) => {
               if (number < 10) {
                   return '0' + number;
               }
               return number;
           }
           return date.getFullYear() +
               '-' + pad(date.getMonth() + 1) +
               '-' + pad(date.getDate()) +
               'T' + pad(date.getHours()) +
               ':' + pad(date.getMinutes()) +
               ':' + pad(date.getSeconds()) +
               '.' + (date.getMilliseconds() / 1000).toFixed(3).slice(2, 5)
               ;
       }
       Date.prototype.toJSON = function () {
           return toIsoString(this)
       }
       Date.prototype.toISOString = function () {
           return toIsoString(this)
       }

   }

   public invalidAndTouchedNgModel(ngModel: NgModel | null): boolean | null | undefined {
      return ngModel?.touched && ngModel?.invalid;
   }



   public CustomFilter(value: any, filter: any): boolean {
       if (!filter) { return true };
       if (!value) { return false };

       return (value === filter);
   }

   public MonthFilter(value: Date, filter: Date): boolean {
       if (!filter) { return true };
       if (!value) { return false };

       return (value.getMonth() == filter.getMonth() && value.getFullYear() == filter.getFullYear());
   }


   public FiltroReceptores(value: any[], filterValues: any[]) {
       if (!filterValues) { return true };
       if (!value) { return false };

       let vResult = value.filter(
           (centroCosto) => {
               let filterResult = filterValues.filter(
                   (filtro) => {
                       if (centroCosto.CCosto != undefined) return centroCosto.CCosto == filtro.CCosto;
                       else {

                           return centroCosto.CentroCosto.CCosto == filtro.CCosto;
                       }
                   }
               )
               return filterResult.length > 0;
           }
       )

       return vResult.length > 0;

   }

   //Deja la fecha en formato dd/MM/YYYY. Si es formato para excel, será dd-MM-YYYY
   FormatearFecha(prmFecha: Date | string,  prmEsFormatoParaExcel: boolean = false, prmFormato: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' }): string | null {
      if (!prmFecha) return null;
    
      const vFecha = typeof prmFecha === 'string' ? new Date(prmFecha) : prmFecha;
      if (isNaN(vFecha.getTime())) return null;
    
      const vFechaFormateada = new Intl.DateTimeFormat('es-CL', prmFormato).format(vFecha);
      
      if(prmEsFormatoParaExcel)
         return vFechaFormateada.replace(/\//g, '-'); // ← reemplaza / por -
      else
         return vFechaFormateada;
   }

   FormatearRUT(prmRut: RUT): string | null {
      if (!prmRut) return null;
      
      if(prmRut.Numero)
         return new Intl.NumberFormat('es-CL').format(prmRut.Numero) + '-' + prmRut.DV;
      else
         return null;
    }
    
}
