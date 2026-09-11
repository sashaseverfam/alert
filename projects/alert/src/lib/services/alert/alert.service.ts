import { EAlertType } from '../../enums/alert.enum';
import { IAlert } from '../../interfaces/alert.interface';
import { inject, Injectable } from '@angular/core';
import { ALERT_CONFIG } from '../../config/alert.config';
import { AlertEventsService } from '../alert-events/alert-events.service';
import { AlertContainerInitializerService } from '../alert-container/alert-container.service';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private defaultId = 'default-alert';

  private alertContainerInitializerService = inject(
    AlertContainerInitializerService
  );
  private alertEventsService = inject(AlertEventsService);
  private config = inject(ALERT_CONFIG);

  private initContainer() {
    this.alertContainerInitializerService.initContainer();
  }

  alert(alert: IAlert) {
    this.initContainer();
    this.alertEventsService.sendAlert(alert);
  }

  success(message: string, options?: Partial<IAlert>) {
    this.alert({
      id: options?.id || this.defaultId,
      type: EAlertType.Success,
      message,
      title: options?.title,
      autoClose: options?.autoClose ?? true,
      autoCloseDuration: options?.autoCloseDuration || this.config.autoCloseDuration,
      showClose: options?.showClose ?? true,
      createdAt: new Date(),
      onClick: options?.onClick,
    });
  }

  error(message: string, options?: Partial<IAlert>) {
    this.alert({
      id: options?.id || this.defaultId,
      type: EAlertType.Error,
      message,
      title: options?.title,
      autoClose: options?.autoClose ?? true,
      autoCloseDuration: options?.autoCloseDuration || this.config.autoCloseDuration,
      showClose: options?.showClose ?? true,
      createdAt: new Date(),
      onClick: options?.onClick,
    });
  }

  info(message: string, options?: Partial<IAlert>) {
    this.alert({
      id: options?.id || this.defaultId,
      type: EAlertType.Info,
      message,
      title: options?.title,
      autoClose: options?.autoClose ?? true,
      autoCloseDuration: options?.autoCloseDuration || this.config.autoCloseDuration,
      showClose: options?.showClose ?? true,
      createdAt: new Date(),
      onClick: options?.onClick,
    });
  }
}
