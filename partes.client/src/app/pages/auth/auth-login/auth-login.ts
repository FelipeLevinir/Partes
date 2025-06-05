import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { UsuarioService } from '@/helpers/services/usuario.service';
import { GlobalService } from '@/helpers/services/global.service';
import { RecaptchaV3Module, ReCaptchaV3Service } from 'ng-recaptcha';
import { Response } from '@/helpers/interfaces/response';
import { Usuario } from '@/helpers/classes/usuario';
import { Subscription } from 'rxjs';
import { UtilitiesService } from '@/helpers/services/utilities.service';
import { LayoutService } from '@/layout/service/layout.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, 
               RouterModule, 
               InputTextModule, 
               FormsModule, 
               CheckboxModule, 
               ButtonModule,
               RecaptchaV3Module],
    templateUrl: './auth-login.html',
})
export class Login implements OnInit {

   Usuario: Usuario;

   Loading: boolean = false;
   captchaSubscription: Subscription | null = null;
   captchaToken: string | null = null;
   dark: boolean = false;

   constructor(private readonly route: ActivatedRoute,
       private readonly router: Router,
       private readonly usuarioService: UsuarioService,
       private readonly globalService: GlobalService,
       private readonly utilitiesService: UtilitiesService,
       private readonly recaptchaV3Service: ReCaptchaV3Service,
      public layoutService: LayoutService) {

       this.globalService.CurrentUser = null;
       this.Usuario = new Usuario();
   }

   ngOnInit(): void {
      this.utilitiesService.MostrarCaptchaBadge();
      if (this.route.snapshot.queryParams['prmUSER']) {
         this.Loading = true;

         this.usuarioService.LoginFromEV(this.route.snapshot.queryParams['prmUSER']).subscribe({
            next: (value: Response) => { this.globalService.CurrentUser = value.Data; this.utilitiesService.OcultarCaptchaBadge(); },
            error: (error: Response) => { this.utilitiesService.ShowError(error.Error!.Message).then((value) => { this.Loading = false }) },
            complete: () => this.router.navigate(['inicio'])
         });
      }
   }

   public Login() {
       this.Loading = true;
 
       if (this.captchaSubscription) this.captchaSubscription.unsubscribe();

       this.captchaSubscription = this.recaptchaV3Service.execute('login').subscribe((token) => {
           this.Usuario.Token = token;

           this.usuarioService.Login(this.Usuario).subscribe({
               next: (value: Response) => { this.globalService.CurrentUser = value.Data; this.utilitiesService.OcultarCaptchaBadge(); },
               error: (error: Response) => { this.utilitiesService.ShowError(error?.Error!.Message).then((value) => { this.Loading = false }) },
               complete: () => this.router.navigate(['inicio'])
           });

       })



   }
}
