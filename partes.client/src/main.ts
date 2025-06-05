import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app.config';
import { AppComponent } from './app.component';
import localeEsCL from '@angular/common/locales/es-CL';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeEsCL);

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
