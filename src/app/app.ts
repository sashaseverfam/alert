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
      title: 'Успех',
    });
  }

  showError() {
    this.alertService.error('Не удалось сохранить данные.', {
      title: 'Ошибка',
      showClose: false,
      actions: [
        { label: 'Повторить', onClick: (id) => console.log('Retry:', id) },
        { label: 'Отмена', onClick: (id) => console.log('Cancel:', id) },
      ],
    });
  }

  showInfo() {
    this.alertService.info('Новое обновление доступно.', {
      title: 'Информация',
      autoClose: false,
      htmlMessage: '<strong>Версия 2.0</strong> включает новые функции. <a href="#">Подробнее</a>',
      actions: [
        { label: 'Обновить', onClick: (id) => console.log('Update:', id) },
      ],
    });
  }
}
