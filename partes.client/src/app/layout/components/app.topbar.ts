import {Component, computed, ElementRef, inject, ViewChild} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {StyleClassModule} from 'primeng/styleclass';
import {LayoutService} from '@/layout/service/layout.service';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {RippleModule} from 'primeng/ripple';
import {BadgeModule} from 'primeng/badge';
import {OverlayBadgeModule} from 'primeng/overlaybadge';
import {AvatarModule} from 'primeng/avatar';
import {FormsModule} from "@angular/forms";
import { GlobalService } from '@/helpers/services/global.service';
import { AuthImagePipe } from '@/helpers/pipes/auth-image.pipe';
import { environment } from 'src/environments/environment';

 
@Component({
    selector: '[app-topbar]',
    standalone: true,
    imports: [RouterModule, 
               CommonModule, 
               FormsModule, 
               StyleClassModule, 
               InputTextModule, 
               ButtonModule, 
               IconFieldModule, 
               InputIconModule, 
               RippleModule, 
               BadgeModule, 
               OverlayBadgeModule, 
               AvatarModule, 
               AuthImagePipe],
    template: `
    <div class="layout-topbar grid grid-cols-1"  >    
         <div class="topbar-left grid">          
            <a tabindex="0" #menubutton type="button" class="menu-button" (click)="onMenuButtonClick()">
               <i class="pi pi-chevron-left"></i>
            </a>
            <img class="horizontal-logo" src="assets/layout/images/camaralogo.png" alt="logo"/>
            <span class="topbar-separator"></span>
            
            <span class="text-4xl font-bold md:inline-flex hidden">Plantilla Nombre Extenso App</span>
         </div>
      </div>

      <div class="grid topbar-usuario">             
         <ul class="topbar-menu">
            <li class="profile-item static sm:relative flex gap-2 ">
               <div class="flex flex-col text-right">
                  <span class="font-semibold">{{globalService.CurrentUser?.Persona?.Nombre}}</span>
                  <span class="text-xs">{{globalService.CurrentUser?.Privilegios?.Rol?.Nombre}}</span>
               </div>   
               <a class="right-sidebar-button relative z-50 cursor-pointer" pStyleClass="@next" enterFromClass="hidden"
                  enterActiveClass="animate-scalein" leaveActiveClass="animate-fadeout" leaveToClass="hidden"
                  [hideOnOutsideClick]="true">
               <p-avatar styleClass="!w-10 !h-10">
                   <img [src]="MiFotoURL | authImage | async" alt="demo" />
               </p-avatar>
           </a>
           <div
               class="list-none p-2 m-0 rounded-2xl border border-surface overflow-hidden absolute bg-surface-0 dark:bg-surface-900 hidden origin-top w-52 mt-10 right-0 z-[999] top-auto shadow-[0px_56px_16px_0px_rgba(0,0,0,0.00),0px_36px_14px_0px_rgba(0,0,0,0.01),0px_20px_12px_0px_rgba(0,0,0,0.02),0px_9px_9px_0px_rgba(0,0,0,0.03),0px_2px_5px_0px_rgba(0,0,0,0.04)]"
           >
               <ul class="flex flex-col gap-1">
     
                   <li>
                       <a class="label-small dark:text-surface-400 flex gap-2 py-2 px-2.5 rounded-lg items-center hover:bg-emphasis transition-colors duration-150 cursor-pointer" (click)="onConfigButtonClick()">
                           <i class="pi pi-cog"></i>
                           <span>Configuración</span>
                       </a>
                   </li>
                   
                   <li>
                       <a class="label-small dark:text-surface-400 flex gap-2 py-2 px-2.5 rounded-lg items-center hover:bg-emphasis transition-colors duration-150 cursor-pointer" (click)="CerrarSesion()">
                           <i class="pi pi-power-off"></i>
                           <span>Cerrar Sesión</span>
                       </a>
                   </li>
               </ul>
           </div>
       </li>
       
   </ul>
</div>`
})
export class AppTopbar {

   MiFotoURL: string = environment.apiSSOURL + "Usuario/MiFoto";
   
   globalService = inject(GlobalService);
   routerService = inject(Router);
   layoutService = inject(LayoutService);
   
   isDarkTheme = computed(() => this.layoutService.isDarkTheme());
 
   @ViewChild('menubutton') menuButton!: ElementRef;

   CerrarSesion() {
		this.globalService.CurrentUser = null;		       
      this.routerService.navigate(['/login']);
	}

   onMenuButtonClick() { 
      this.layoutService.onMenuToggle();        
   }

   showRightMenu() {
      this.layoutService.toggleRightMenu();
   }

   onConfigButtonClick() {
      this.layoutService.showConfigSidebar();
   }

   toggleSearchBar() {
      this.layoutService.layoutState.update((value) => ({...value, searchBarActive: !value.searchBarActive}));
   }
}
