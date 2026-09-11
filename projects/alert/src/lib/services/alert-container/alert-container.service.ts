import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  DOCUMENT,
  EnvironmentInjector,
  inject,
  Injectable,
} from '@angular/core';
import { AlertContainerComponent } from '../../components/alert-container/alert-container.component';

@Injectable({
  providedIn: 'root',
})
export class AlertContainerInitializerService {
  private containerInitialized = false;

  private containerRef?: ComponentRef<AlertContainerComponent>;
  private environmentInjector = inject(EnvironmentInjector);
  private applicationRef = inject(ApplicationRef);
  private document = inject(DOCUMENT);

  initContainer() {
    if (this.containerInitialized) return;

    this.containerRef = createComponent(AlertContainerComponent, {
      environmentInjector: this.environmentInjector,
    });

    this.applicationRef.attachView(this.containerRef.hostView);
    this.document.body.appendChild(this.containerRef.location.nativeElement);

    this.containerInitialized = true;
  }
}
