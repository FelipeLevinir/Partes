import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GlobalService } from './global.service';
 

@Injectable({
  providedIn: 'root'
})
export class UserIdleService {
   private userActivity: any

   private TimeIdle: number = 0;//5 min

   private Closing: boolean = false;
   private LogOutUrl: string = '/login';
   constructor(private readonly globalService: GlobalService,
            private readonly router: Router) {


   }

   public StartWatch(prmLogoutUrl: string, prmMinutes: number = 5) {
      this.LogOutUrl = prmLogoutUrl;

      if (prmMinutes) { this.TimeIdle = prmMinutes * 60_000 }

      this.doSetTimeout();
      window.addEventListener('mousemove', () => { this.ClearUserIdle(); });
      window.addEventListener('keydown', () => { this.ClearUserIdle(); });
   }

   private UserIdle() {
      if (!this.Closing && this.globalService.CurrentUser) {
         this.Closing = true;
         Swal.fire({
               title: 'Atención',
               text: "No se detecta actividad. ¿Deseas continuar?",
               icon: 'warning',
               allowEscapeKey: false,
               allowOutsideClick: false,
               showCancelButton: true,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: 'SÍ. Deseo continuar!',
               cancelButtonText: "Salir",
               timer: 60000,
               timerProgressBar: true
         }).then(
               (result) => {
                  if (result.value) {
                     this.Closing = false;
                     this.ClearUserIdle();
                  } else {
                     this.globalService.CurrentUser = null;
                     Swal.fire({
                           icon: 'error',
                           title: 'Ha finalizado su sesión',
                           allowEscapeKey: false,
                           allowOutsideClick: false
                     }).then((value) => {
                           window.location.href = this.LogOutUrl
                     }
                     )

                  };
               }

         )


      }
      else { this.doSetTimeout() }
   }

   private doSetTimeout() {

      this.userActivity = setTimeout(() => this.UserIdle(), this.TimeIdle);
   }

   private ClearUserIdle() {
      if (!this.Closing) {
         clearTimeout(this.userActivity);
         this.doSetTimeout();
      }

   }
}
