import { InjectionToken } from '@angular/core';

export interface AlertConfig {
  maxAlerts: number;
  autoCloseDuration: number;
}

const DEFAULT_ALERT_CONFIG: AlertConfig = {
  maxAlerts: 5,
  autoCloseDuration: 5000,
};

export const ALERT_CONFIG = new InjectionToken<AlertConfig>('ALERT_CONFIG', {
  providedIn: 'root',
  factory: () => DEFAULT_ALERT_CONFIG,
});
