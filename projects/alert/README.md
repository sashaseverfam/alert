# @severfam/alert

Angular alert/notification library with configurable animations, positions, and icons. Built with Angular 21, signals, and OnPush change detection.

## Installation

```bash
npm install @severfam/alert
```

## Setup

Add `AlertService` to your app providers and configure with `ALERT_CONFIG`:

```typescript
// app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ALERT_CONFIG, AlertConfig } from '@severfam/alert';
import { routes } from './app.routes';
import { AppComponent } from './app.component';

const alertConfig: AlertConfig = {
  maxAlerts: 5,
  autoCloseDuration: 5000,
  position: 'top-right',
  animation: 'slide',
  icons: {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
    close: '✖',
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

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: ALERT_CONFIG, useValue: alertConfig },
  ],
};
```

## AlertService API

Inject `AlertService` in your component:

```typescript
import { AlertService } from '@severfam/alert';

@Component({ ... })
export class MyComponent {
  private alertService = inject(AlertService);
}
```

### Methods

| Method | Description |
| --- | --- |
| `alert(data: IAlert)` | Show alert with full configuration |
| `success(message, options?)` | Show success alert |
| `error(message, options?)` | Show error alert |
| `info(message, options?)` | Show info alert |

## IAlert Interface

```typescript
interface IAlert {
  id: string;                      // Unique identifier
  type: EAlertType;                // 'success' | 'error' | 'info'
  message: string;                 // Alert message text
  title?: string;                  // Optional title
  htmlMessage?: string;            // Optional HTML message (sanitized)
  autoClose: boolean;              // Auto-close enabled
  autoCloseDuration: number;       // Duration in ms before auto-close
  showClose: boolean;              // Show close button
  createdAt: Date;                 // Creation timestamp
  onClick?: (id: string) => void; // Click handler
  actions?: AlertAction[];         // Action buttons
  colors?: AlertColorOverrides;    // Per-alert color overrides
}

interface AlertAction {
  label: string;
  onClick: (id: string) => void;
}

interface AlertColorOverrides {
  backgroundColor?: string;  // Override background color
  iconColor?: string;         // Override icon color
  buttonColor?: string;       // Override action button color
  progressColor?: string;     // Override progress bar color
}
```

## AlertConfig Interface

```typescript
interface AlertConfig {
  maxAlerts: number;           // Max visible alerts (default: 5)
  autoCloseDuration: number;   // Default duration in ms (default: 5000)
  position: AlertPosition;     // Position on screen
  animation: AlertAnimation;   // Animation type
  icons: AlertIcons;           // Custom icons
  colors: AlertColors;         // Color palette per alert type
}

type AlertPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'    // default
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

type AlertAnimation = 'slide' | 'fade' | 'none';  // default: 'slide'

interface AlertIcons {
  success: string;  // SVG or Unicode (default: '✅')
  error: string;    // SVG or Unicode (default: '❌')
  info: string;     // SVG or Unicode (default: 'ℹ️')
  close: string;    // SVG or Unicode (default: '✖')
}

interface AlertColors {
  info: AlertColorSet;
  error: AlertColorSet;
  success: AlertColorSet;
}

interface AlertColorSet {
  backgroundColor: string;  // Background (default: '#e0f2fe' for info)
  iconColor: string;        // Icon color (default: '#3b82f6' for info)
  buttonColor: string;      // Action button color (default: '#3b82f6' for info)
  progressColor: string;    // Progress bar color (default: '#3b82f6' for info)
}
```

## AlertComponent Inputs/Outputs

When using `<alert>` directly (dynamically created by the service):

### Inputs (Model Signals)

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `alert` | `WritableSignal<IAlert>` | Yes | Alert data. Use `alert.set(value)` to update. |

### Outputs

| Name | Type | Description |
| --- | --- | --- |
| `closed` | `OutputEmitterRef<string>` | Emits alert ID when alert is closed |
| `clicked` | `OutputEmitterRef<string>` | Emits alert ID when alert is clicked |

## AlertEventsService

Observable streams for global alert events:

```typescript
import { AlertEventsService } from '@severfam/alert';

@Component({ ... })
export class MyComponent {
  private alertEvents = inject(AlertEventsService);

  constructor() {
    // Subscribe to all alerts
    this.alertEvents.alerts$.subscribe(alert => {
      console.log('New alert:', alert);
    });

    // Subscribe to alert clicks
    this.alertEvents.clicks$.subscribe(alertId => {
      console.log('Alert clicked:', alertId);
    });
  }
}
```

| Property | Type | Description |
| --- | --- | --- |
| `alerts$` | `Observable<IAlert>` | Stream of all sent alerts |
| `clicks$` | `Observable<string>` | Stream of clicked alert IDs |

## Examples

### Basic Usage

```typescript
// Show simple alerts
this.alertService.success('Operation completed!');
this.alertService.error('Something went wrong');
this.alertService.info('Here is some information');
```

### With Title and Options

```typescript
this.alertService.success('Saved!', {
  title: 'Success',
  autoClose: true,
  autoCloseDuration: 3000,
  showClose: true,
});
```

### With HTML Message

```typescript
this.alertService.info('', {
  htmlMessage: '<strong>Bold</strong> and <em>italic</em> text',
});
```

### With Custom Icons (SVG)

```typescript
const customConfig: AlertConfig = {
  maxAlerts: 5,
  autoCloseDuration: 5000,
  position: 'bottom-right',
  animation: 'slide',
  icons: {
    success: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',
    error: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>',
    info: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="blue"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>',
    close: '×',
  },
};
```

### With Actions

```typescript
this.alertService.error('Delete this item?', {
  title: 'Confirm',
  showClose: false,
  actions: [
    {
      label: 'Yes, delete',
      onClick: (id) => {
        console.log('Confirmed:', id);
        // Perform delete
      },
    },
    {
      label: 'Cancel',
      onClick: (id) => {
        console.log('Cancelled:', id);
      },
    },
  ],
});
```

### With Click Handler

```typescript
this.alertService.info('Click me!', {
  onClick: (id) => {
    console.log('Alert clicked:', id);
    // Navigate or perform action
  },
});
```

### Custom Position

```typescript
// bottom-left
this.alertService.info('Bottom left alert', { autoClose: false });

// Override position per alert
const config: AlertConfig = {
  ...alertConfig,
  position: 'bottom-center',
};
```

### No Auto-Close

```typescript
this.alertService.error('Critical error!', {
  autoClose: false,
  showClose: true,
});
```

### Custom Colors

```typescript
// Per-alert color overrides
this.alertService.info('Custom colored alert', {
  colors: {
    backgroundColor: '#dbeafe',
    iconColor: '#1d4ed8',
    buttonColor: '#1d4ed8',
    progressColor: '#1d4ed8',
  },
});

// Partial overrides - only override what you need
this.alertService.success('Green alert', {
  colors: {
    backgroundColor: '#bbf7d0',
  },
});

// Global color config via AlertConfig
const config: AlertConfig = {
  ...alertConfig,
  colors: {
    info: {
      backgroundColor: '#dbeafe',
      iconColor: '#1d4ed8',
      buttonColor: '#1d4ed8',
      progressColor: '#1d4ed8',
    },
    error: {
      backgroundColor: '#fecaca',
      iconColor: '#dc2626',
      buttonColor: '#dc2626',
      progressColor: '#dc2626',
    },
    success: {
      backgroundColor: '#bbf7d0',
      iconColor: '#16a34a',
      buttonColor: '#16a34a',
      progressColor: '#16a34a',
    },
  },
};
```

### Custom Duration

```typescript
this.alertService.success('Short alert', {
  autoCloseDuration: 2000, // 2 seconds
});

this.alertService.info('Long alert', {
  autoCloseDuration: 15000, // 15 seconds
});
```

### All Positions

```typescript
const positions: AlertPosition[] = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
];

positions.forEach(pos => {
  const config: AlertConfig = { ...alertConfig, position: pos };
  // Apply config and show alert
});
```

### Animation Types

```typescript
// Slide animation (default)
const slideConfig: AlertConfig = { animation: 'slide' };

// Fade animation
const fadeConfig: AlertConfig = { animation: 'fade' };

// No animation
const noAnimConfig: AlertConfig = { animation: 'none' };
```

### Using Directly in Template

```html
<alert
  [alert]="alertData"
  (closed)="onAlertClosed($event)"
  (clicked)="onAlertClicked($event)"
/>
```

```typescript
alertData = signal<IAlert>({
  id: 'my-alert',
  type: EAlertType.Success,
  message: 'Hello!',
  autoClose: true,
  autoCloseDuration: 5000,
  showClose: true,
  createdAt: new Date(),
});

onAlertClosed(id: string) {
  console.log('Closed:', id);
}

onAlertClicked(id: string) {
  console.log('Clicked:', id);
}
```

### Global Event Subscription

```typescript
@Component({ ... })
export class AppComponent {
  private alertEvents = inject(AlertEventsService);

  constructor() {
    this.alertEvents.alerts$.subscribe(alert => {
      analytics.track('alert_shown', { type: alert.type });
    });

    this.alertEvents.clicks$.subscribe(id => {
      analytics.track('alert_clicked', { id });
    });
  }
}
```

## Default Configuration

```typescript
{
  maxAlerts: 5,
  autoCloseDuration: 5000,
  position: 'top-right',
  animation: 'slide',
  icons: {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
    close: '✖',
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
  }
}
```

## Requirements

- Angular 21.2+
- TypeScript 5.9+

## License

MIT
