import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

/** AplazoInputComponent
 *
 *
 */
@Component({
  selector: 'aplz-input',
  templateUrl: `./aplazo-input.component.html`,
  styleUrls: ['./aplazo-input.component.scss'],
  standalone: true,
  imports: [NgClass],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class AplazoInputComponent {
  @Input() type: 'text' | 'number' | 'datetime' | 'password' = 'text';
  @Input() label: string;
  @Input() placeholder: string;
  @Input() controlName: string;
  @Input() error: boolean;
}
