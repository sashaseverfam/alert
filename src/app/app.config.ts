import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ALERT_CONFIG } from '@severfam/alert';

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
        position: 'top-right',
        animation: 'slide',
        icons: {
          success: '\u{1F44D}',
          error:
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>',
          info: '\u2139\uFE0F',
          close: '\u2716',
        },
        colors: {
          info: {
            backgroundColor: '#e0f2fe',
            iconColor: '#3b82f6',
            buttonColor: '#3b82f6',
            progressColor: '#3b82f6',
          },
          error: {
            backgroundColor: '#fee2e2',
            iconColor: '#ef4444',
            buttonColor: '#ef4444',
            progressColor: '#ef4444',
          },
          success: {
            backgroundColor: '#dcfce7',
            iconColor: '#22c55e',
            buttonColor: '#22c55e',
            progressColor: '#22c55e',
          },
        },
      },
    },
  ],
};
