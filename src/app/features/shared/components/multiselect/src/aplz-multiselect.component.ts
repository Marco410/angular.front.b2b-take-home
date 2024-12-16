import { CommonModule, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AplazoInputComponent } from '../../input/src';

@Component({
  standalone: true,
  selector: 'aplz-multiselect',
  imports: [
    MatSelectModule,
    ReactiveFormsModule,
    NgClass,
    MatFormFieldModule,
    CommonModule,
    AplazoInputComponent,
  ],
  templateUrl: './aplz-multiselect.component.html',
  styleUrls: ['./aplz-multiselect.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class MultiselectComponent {
  @Input() options: any[] = [];
  @Input() control = new FormControl();
  @Input() placeholder: string;
}
