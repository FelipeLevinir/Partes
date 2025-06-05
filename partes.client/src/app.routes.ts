import { Routes } from '@angular/router';
import { AppLayout } from '@/layout/components/app.layout';
import { LandingLayout } from '@/layout/components/app.landinglayout';
import { Notfound } from '@/pages/notfound/notfound';
import { CheckRoutePrivilegios } from '@/helpers/services/check-route-privilegios';
import viewsRoutes from '@/views/views.routes';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('@/views/inicio/inicio.component').then((m) => m.InicioComponent),
            },
            ...viewsRoutes,
            {
                path: '**',
                redirectTo: '/notfound'
            }
        ]
    }
];
