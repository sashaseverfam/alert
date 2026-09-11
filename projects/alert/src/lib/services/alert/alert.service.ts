import { EAlertType } from '../../enums/alert.enum';
import { IAlert } from '../../interfaces/alert.interface';
import { inject, Injectable } from '@angular/core';
import { AUTO_CLOSE_DURATION } from '../../constants/alert.const';
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
      autoClose: options?.autoClose || true,
      autoCloseDuration: options?.autoCloseDuration || AUTO_CLOSE_DURATION,
      createdAt: new Date(),
    });
  }

  error(message: string, options?: Partial<IAlert>) {
    this.alert({
      id: options?.id || this.defaultId,
      type: EAlertType.Error,
      message,
      autoClose: options?.autoClose || true,
      autoCloseDuration: options?.autoCloseDuration || AUTO_CLOSE_DURATION,
      createdAt: new Date(),
    });
  }

  info(message: string, options?: Partial<IAlert>) {
    this.alert({
      id: options?.id || this.defaultId,
      type: EAlertType.Info,
      message,
      autoClose: options?.autoClose || true,
      autoCloseDuration: options?.autoCloseDuration || AUTO_CLOSE_DURATION,
      createdAt: new Date(),
    });
  }
}
