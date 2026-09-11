import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IAlert } from '../../interfaces/alert.interface';

@Injectable({
  providedIn: 'root',
})
export class AlertEventsService {
  private alertSubject = new Subject<IAlert>();

  readonly alerts$ = this.alertSubject.asObservable();

  sendAlert(alert: IAlert) {
    this.alertSubject.next(alert);
  }
}
