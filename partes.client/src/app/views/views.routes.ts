import { Routes } from '@angular/router';

export default [
   {
      path: 'inicio',
      loadComponent: () => import('@/views/inicio/inicio.component').then((c) => c.InicioComponent)
   },
     
] as Routes;
