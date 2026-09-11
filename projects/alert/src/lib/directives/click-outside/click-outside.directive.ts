import { Directive, ElementRef, EventEmitter, Output, inject } from '@angular/core';

@Directive({
  selector: '[commonClickOutside]',
  host: {
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class ClickOutsideDirective {
  @Output() clickOutsideEvent = new EventEmitter<void>();

  private elementRef = inject(ElementRef);

  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!this.elementRef.nativeElement.contains(target)) {
      this.clickOutsideEvent.emit();
    }
  }
}
