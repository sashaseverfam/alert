import { InjectionToken } from '@angular/core';

export type AlertPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface AlertIcons {
  success: string;
  error: string;
  info: string;
  close: string;
}

/**
 * Alert configuration.
 * Icons accept SVG markup or Unicode characters.
 */
export interface AlertConfig {
  maxAlerts: number;
  autoCloseDuration: number;
  icons: AlertIcons;
  position: AlertPosition;
}

const DEFAULT_ALERT_CONFIG: AlertConfig = {
  maxAlerts: 5,
  autoCloseDuration: 5000,
  position: 'top-right',
  icons: {
    success: '\u2705',
    error: '\u274C',
    info: '\u2139\uFE0F',
    close: '\u2716',
  },
};

export const ALERT_CONFIG = new InjectionToken<AlertConfig>('ALERT_CONFIG', {
  providedIn: 'root',
  factory: () => DEFAULT_ALERT_CONFIG,
});
