import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-alert',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <p>alert works!</p> `,
  styles: ``,
})
export class Alert {}
