import { UserIdleService } from '@/helpers/services/user-idle.service';
import { UtilitiesService } from '@/helpers/services/utilities.service';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FilterService } from 'primeng/api';
 

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule],
    template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit   {
   constructor(private readonly userIdleService: UserIdleService, 
      private filterService: FilterService,
      private utilitiesService: UtilitiesService
   ){
      
   }

   ngOnInit(): void {
      this.userIdleService.StartWatch('https://appcam.camara.cl/ev/main.aspx');
      this.utilitiesService.overrideDate();
      this.filterService.filters['month'] = this.utilitiesService.MonthFilter;
      
   }

 
}
