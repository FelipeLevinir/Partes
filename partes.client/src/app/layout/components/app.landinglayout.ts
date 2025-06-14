import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutService } from '@/layout/service/layout.service';

@Component({
    selector: 'app-landing-layout',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: ` <div class="w-full min-h-screen">
        <main>
            <router-outlet />
        </main>
        <!-- <button class="layout-config-button config-link" (click)="layoutService.toggleConfigSidebar()">
            <i class="pi pi-cog"></i>
        </button> -->
        <!-- <app-configurator location="landing" /> -->
    </div>`
})
export class LandingLayout {
    layoutService: LayoutService = inject(LayoutService);
}
