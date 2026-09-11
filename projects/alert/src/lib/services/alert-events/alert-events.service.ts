import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IAlert } from '../../interfaces/alert.interface';

@Injectable({
  providedIn: 'root',
})
export class AlertEventsService {
  private alertSubject = new Subject<IAlert>();
  private clickSubject = new Subject<string>();

  readonly alerts$ = this.alertSubject.asObservable();
  readonly clicks$ = this.clickSubject.asObservable();

  sendAlert(alert: IAlert) {
    this.alertSubject.next(alert);
  }

  emitClick(alertId: string) {
    this.clickSubject.next(alertId);
  }
}
