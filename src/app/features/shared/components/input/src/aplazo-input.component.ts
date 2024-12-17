import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroupDirective,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
/** AplazoInputComponent
 */
@Component({
  selector: 'aplz-input',
  templateUrl: `./aplazo-input.component.html`,
  styleUrls: ['./aplazo-input.component.scss'],
  standalone: true,
  imports: [NgClass, ReactiveFormsModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class AplazoInputComponent {
  @Input() type: 'text' | 'number' | 'datetime' | 'date' | 'password' = 'text';
  @Input() label: string;
  @Input() placeholder: string;
  @Input() control: FormControl = new FormControl();
  @Input() error: boolean;
}
