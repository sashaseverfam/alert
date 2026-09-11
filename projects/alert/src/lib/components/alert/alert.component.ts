import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IAlert } from '../../interfaces/alert.interface';
import { EAlertType } from '../../enums/alert.enum';
import { ClickOutsideDirective } from '../../directives/click-outside/click-outside.directive';
import { WINDOW } from '../../providers/window.providers';
import { ALERT_CONFIG, AlertConfig } from '../../config/alert.config';

@Component({
  selector: 'common-alert',
  imports: [CommonModule, ClickOutsideDirective],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent implements AfterViewInit, OnDestroy {
  @Input() alert!: IAlert;
  @Output() closed = new EventEmitter<string>();

  @ViewChild('progressBar') progressBar!: ElementRef<HTMLDivElement>;

  private readonly window = inject(WINDOW);
  protected readonly config = inject<AlertConfig>(ALERT_CONFIG);

  readonly EAlertType = EAlertType;

  private remainingTime = 0;
  private timeoutId: number | null = null;
  private startTime = 0;
  private isPaused = false;

  ngAfterViewInit() {
    if (this.alert.autoClose) {
      this.remainingTime = this.alert.autoCloseDuration;

      if (this.remainingTime > 0) {
        this.startTimer();
        this.startProgressBar();
      }
    }
  }

  onMouseEnter() {
    if (this.alert.autoClose && this.remainingTime > 0) {
      this.pauseTimer();
      this.pauseProgressBar();
    }
  }

  onMouseLeave() {
    if (this.alert.autoClose && this.remainingTime > 0) {
      this.resumeTimer();
      this.resumeProgressBar();
    }
  }

  onTouchStart() {
    if (this.alert.autoClose && this.remainingTime > 0) {
      this.pauseTimer();
      this.pauseProgressBar();
    }
  }

  onClickOutsideEvent() {
    if (this.alert.autoClose && this.remainingTime > 0) {
      this.resumeTimer();
      this.resumeProgressBar();
    }
  }

  private startTimer() {
    this.startTime = Date.now();
    this.timeoutId = this.window.setTimeout(() => {
      this.selfClose();
    }, this.remainingTime);
  }

  private startProgressBar() {
    if (!this.progressBar?.nativeElement) return;

    const element = this.progressBar.nativeElement;

    element.style.transition = 'none';
    element.style.transform = 'scaleX(1)';

    // Don't remove, stay this for redraw layout
    element.offsetHeight;

    element.style.transition = `transform ${this.remainingTime}ms linear`;
    element.style.transform = 'scaleX(0)';
  }

  private pauseTimer() {
    if (this.isPaused || !this.timeoutId || this.remainingTime <= 0) return;

    this.window.clearTimeout(this.timeoutId);
    this.timeoutId = null;

    const elapsed = Date.now() - this.startTime;
    this.remainingTime -= elapsed;
    this.isPaused = true;

    this.pauseProgressBar();
  }

  private pauseProgressBar() {
    if (!this.progressBar?.nativeElement) return;

    const element = this.progressBar.nativeElement;

    const computedStyle = getComputedStyle(element);

    const matrix = new DOMMatrixReadOnly(computedStyle.transform);
    const currentScale = matrix.m11;

    element.style.transition = 'none';
    element.style.transform = `scaleX(${currentScale})`;
  }

  private resumeTimer() {
    if (!this.isPaused || this.remainingTime <= 0) return;

    this.isPaused = false;
    this.startTimer();

    this.resumeProgressBar();
  }

  private resumeProgressBar() {
    if (!this.progressBar?.nativeElement) return;

    const element = this.progressBar.nativeElement;

    // Don't remove, stay this for redraw layout
    element.offsetHeight;

    element.style.transition = `transform ${this.remainingTime}ms linear`;
    element.style.transform = 'scaleX(0)';
  }

  selfClose(e: Event | null = null) {
    if (e) {
      e.stopPropagation();
    }

    if (this.timeoutId) {
      this.window.clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.closed.emit(this.alert.id);
  }

  ngOnDestroy() {
    if (this.timeoutId) {
      this.window.clearTimeout(this.timeoutId);
    }
  }
}
