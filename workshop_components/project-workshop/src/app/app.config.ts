import { ApplicationConfig, /*provideZoneChangeDetection,*/ provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideZoneChangeDetection({ eventCoalescing: true}),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    HttpClient
  ]
};
