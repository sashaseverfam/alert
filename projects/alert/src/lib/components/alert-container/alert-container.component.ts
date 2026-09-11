import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  DestroyRef,
  ElementRef,
  EnvironmentInjector,
  inject,
  OnDestroy,
  Renderer2,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { AlertComponent } from '../alert/alert.component';
import { IAlert } from '../../interfaces/alert.interface';
import { ALERT_CONFIG } from '../../config/alert.config';
import { WINDOW } from '../../providers/window.providers';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AlertEventsService } from '../../services/alert-events/alert-events.service';

@Component({
  selector: 'common-alert-container',
  standalone: true,
  imports: [],
  templateUrl: './alert-container.component.html',
  styleUrl: './alert-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertContainerComponent implements OnDestroy {
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  private alertEventsService = inject(AlertEventsService);
  private environmentInjector = inject(EnvironmentInjector);
  private readonly window = inject(WINDOW);
  private config = inject(ALERT_CONFIG);
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);

  private componentRefs: Map<string, ComponentRef<AlertComponent>> = new Map();
  private destroyRef = inject(DestroyRef);

  private alertQueue: string[] = [];

  constructor() {
    this.applyPosition();
    this.alertEventsService.alerts$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((alert: IAlert) => {
        this.showAlert(alert);
      });
  }

  private applyPosition() {
    const el = this.elementRef.nativeElement as HTMLElement;
    const pos = this.config.position;

    this.renderer.setStyle(el, 'top', 'auto');
    this.renderer.setStyle(el, 'bottom', 'auto');
    this.renderer.setStyle(el, 'left', 'auto');
    this.renderer.setStyle(el, 'right', 'auto');

    if (pos.startsWith('top')) {
      this.renderer.setStyle(el, 'top', '20px');
    } else {
      this.renderer.setStyle(el, 'bottom', '20px');
    }

    if (pos.endsWith('left')) {
      this.renderer.setStyle(el, 'left', '20px');
    } else if (pos.endsWith('right')) {
      this.renderer.setStyle(el, 'right', '20px');
    } else {
      this.renderer.setStyle(el, 'left', '50%');
      this.renderer.setStyle(el, 'transform', 'translateX(-50%)');
    }
  }

  showAlert(alert: IAlert) {
    if (!this.container) {
      return;
    }

    if (this.alertQueue.length >= this.config.maxAlerts) {
      const oldestAlertId = this.alertQueue.shift();
      if (oldestAlertId) {
        this.removeAlert(oldestAlertId);
      }
    }

    const alertId = `alert-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    const componentRef = this.container.createComponent(AlertComponent, {
      environmentInjector: this.environmentInjector,
      index: 0,
    });

    componentRef.instance.alert = {
      ...alert,
      id: alertId,
    };

    this.applyEnterAnimation(componentRef);

    const closedSubscription = componentRef.instance.closed.subscribe(
      (id: string) => {
        this.removeAlert(id);
      }
    );

    const clickedSubscription = componentRef.instance.clicked.subscribe(
      (id: string) => {
        this.alertEventsService.emitClick(id);
      }
    );

    componentRef.onDestroy(() => {
      closedSubscription.unsubscribe();
      clickedSubscription.unsubscribe();
    });

    this.alertQueue.push(alertId);
    this.componentRefs.set(alertId, componentRef);
  }

  private applyEnterAnimation(componentRef: ComponentRef<AlertComponent>) {
    if (this.config.animation === 'none') return;

    const el = componentRef.location.nativeElement as HTMLElement;
    const className = `alert--${this.config.animation}-enter`;

    this.renderer.addClass(el, className);

    this.window.setTimeout(() => {
      this.renderer.removeClass(el, className);
    }, 300);
  }

  removeAlert(alertId: string) {
    const componentRef = this.componentRefs.get(alertId);

    if (componentRef) {
      const index = this.alertQueue.indexOf(alertId);
      if (index > -1) {
        this.alertQueue.splice(index, 1);
      }

      const el = componentRef.location.nativeElement as HTMLElement;

      if (this.config.animation !== 'none') {
        const className = `alert--${this.config.animation}-exit`;
        this.renderer.addClass(el, className);

        this.window.setTimeout(() => {
          this.destroyAlert(alertId, componentRef);
        }, 300);
      } else {
        this.destroyAlert(alertId, componentRef);
      }
    }
  }

  private destroyAlert(alertId: string, componentRef: ComponentRef<AlertComponent>) {
    componentRef.destroy();
    this.componentRefs.delete(alertId);
  }

  ngOnDestroy() {
    this.componentRefs.forEach((ref) => ref.destroy());
    this.componentRefs.clear();
    this.alertQueue = [];
  }
}
