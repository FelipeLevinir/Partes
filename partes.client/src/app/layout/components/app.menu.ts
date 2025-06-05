import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AppMenuitem} from './app.menuitem';

@Component({
    selector: '[app-menu]',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `
        <ul class="layout-menu">
            <ng-container *ngFor="let item of model; let i = index">
                <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
                <li *ngIf="item.separator" class="menu-separator"></li>
            </ng-container>
        </ul>
    `
})
export class AppMenu {
    model: any[] = [
        {
            label: '',
            icon: 'pi pi-home',
            items: [
               {  label: 'Inicio', 
                  icon: 'pi pi-home', 
                  routerLink: ['/inicio']
               },
               {  label: 'Inputs', 
                  icon: 'pi pi-fw pi-id-card', 
                  routerLink: ['/inputs'] 
               },
               {  label: 'Personas', 
                  icon: 'pi pi-fw pi-list', 
                  routerLink: ['/personas'] 
                  
               },
            ]
        },
         

         {separator: true},
         {
            label: 'Jerarquía',
            icon: 'pi pi-fw pi-align-left',
            items: [
                {
                    label: 'Submenu 1',
                    icon: 'pi pi-fw pi-align-left',
                    items: [
                        {
                            label: 'Submenu 1.1',
                            icon: 'pi pi-fw pi-align-left',
                            items: [
                                {
                                    label: 'Submenu 1.1.1',
                                    icon: 'pi pi-fw pi-align-left'
                                },
                                {
                                    label: 'Submenu 1.1.2',
                                    icon: 'pi pi-fw pi-align-left'
                                },
                                {
                                    label: 'Submenu 1.1.3',
                                    icon: 'pi pi-fw pi-align-left'
                                }
                            ]
                        },
                        {
                            label: 'Submenu 1.2',
                            icon: 'pi pi-fw pi-align-left',
                            items: [
                                {
                                    label: 'Submenu 1.2.1',
                                    icon: 'pi pi-fw pi-align-left'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: 'Submenu 2',
                    icon: 'pi pi-fw pi-align-left',
                    items: [
                        {
                            label: 'Submenu 2.1',
                            icon: 'pi pi-fw pi-align-left',
                            items: [
                                {
                                    label: 'Submenu 2.1.1',
                                    icon: 'pi pi-fw pi-align-left'
                                },
                                {
                                    label: 'Submenu 2.1.2',
                                    icon: 'pi pi-fw pi-align-left'
                                }
                            ]
                        },
                        {
                            label: 'Submenu 2.2',
                            icon: 'pi pi-fw pi-align-left',
                            items: [
                                {
                                    label: 'Submenu 2.2.1',
                                    icon: 'pi pi-fw pi-align-left'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
 
        {separator: true},
        {
            label: 'Páginas',
            icon: 'pi pi-fw pi-briefcase',
            items: [
             
                {
                    label: 'Autenticación',
                    icon: 'pi pi-fw pi-user',
                    items: [
                        {
                            label: 'Login',
                            icon: 'pi pi-fw pi-sign-in',
                            routerLink: ['/login']
                        },

                        {
                            label: 'Error',
                            icon: 'pi pi-fw pi-times-circle',
                            routerLink: ['/error']
                        },
                        {
                            label: 'Acceso Denegado',
                            icon: 'pi pi-fw pi-lock',
                            routerLink: ['/access']
                        },
                         
                         
                         
                         
                        
                    ]
                },
                 
            ]
        },
         
         
    ];
}
