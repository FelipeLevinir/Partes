import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelInfoComponent } from './panel-info/panel-info.component';
import { MessageModule } from 'primeng/message';
import { PanelInfoDataLoadingComponent } from './panel-info-data-loading/panel-info-data-loading.component';
import { PanelInfoDataSavingComponent } from './panel-info-data-saving/panel-info-data-saving.component';
import { PanelInfoErrorComponent } from './panel-info-error/panel-info-error.component';
import { PanelInfoFormInvalidComponent } from './panel-info-form-invalid/panel-info-form-invalid.component';
import { PanelInfoWarningComponent } from './panel-info-warning/panel-info-warning.component';



@NgModule({
  declarations: [PanelInfoComponent,
                  PanelInfoDataLoadingComponent,
                  PanelInfoDataSavingComponent,
                  PanelInfoErrorComponent,
                  PanelInfoFormInvalidComponent,
                  PanelInfoWarningComponent
  ],
  imports: [
    CommonModule,
    MessageModule
  ],
  exports:[PanelInfoComponent, 
            PanelInfoDataLoadingComponent,
            PanelInfoDataSavingComponent,
            PanelInfoErrorComponent,
            PanelInfoFormInvalidComponent,
            PanelInfoWarningComponent]
})
export class PanelInfoModule { }
