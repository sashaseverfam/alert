import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertService } from 'alert';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('angular-alert');

  private readonly alertService = inject(AlertService);

  showSuccess() {
    this.alertService.success('Это сообщение об успехе!');
  }

  showError() {
    this.alertService.error('Произошла ошибка!');
  }

  showInfo() {
    this.alertService.info('Информационное сообщение.');
  }
}
