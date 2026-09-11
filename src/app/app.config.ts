import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ALERT_CONFIG } from 'alert';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {
      provide: ALERT_CONFIG,
      useValue: {
        maxAlerts: 3,
        autoCloseDuration: 3000,
      },
    },
  ]
};
