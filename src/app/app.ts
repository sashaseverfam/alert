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
    this.alertService.success('Операция выполнена успешно!', {
    });
  }

  showError() {
    this.alertService.error('Не удалось сохранить данные.', {
      title: 'Ошибка',
      showClose: false,
      onClick: (id) => console.log('Error alert clicked:', id),
    });
  }

  showInfo() {
    this.alertService.info('Новое обновление доступно.', {
      title: 'Информация',
      autoClose: false,
      onClick: (id) => console.log('Info alert clicked:', id),
    });
  }
}
