import { InjectionToken } from '@angular/core';

export type AlertPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export type AlertAnimation = 'slide' | 'fade' | 'none';

export interface AlertIcons {
  success: string;
  error: string;
  info: string;
  close: string;
}

export interface AlertColors {
  info: {
    backgroundColor: string;
    iconColor: string;
    buttonColor: string;
    progressColor: string;
  };
  error: {
    backgroundColor: string;
    iconColor: string;
    buttonColor: string;
    progressColor: string;
  };
  success: {
    backgroundColor: string;
    iconColor: string;
    buttonColor: string;
    progressColor: string;
  };
}

/**
 * Alert configuration.
 * Icons accept SVG markup or Unicode characters.
 */
export interface AlertConfig {
  maxAlerts: number;
  autoCloseDuration: number;
  icons: AlertIcons;
  colors: AlertColors;
  position: AlertPosition;
  animation: AlertAnimation;
}

const DEFAULT_ALERT_CONFIG: AlertConfig = {
  maxAlerts: 5,
  autoCloseDuration: 5000,
  position: 'top-right',
  animation: 'slide',
  icons: {
    success: '\u2705',
    error: '\u274C',
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
};

export const ALERT_CONFIG = new InjectionToken<AlertConfig>('ALERT_CONFIG', {
  providedIn: 'root',
  factory: () => DEFAULT_ALERT_CONFIG,
});
