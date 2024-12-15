/* eslint-disable @angular-eslint/no-host-metadata-property */
import { Directive, ElementRef, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  standalone: true,
  selector: 'input[aplazoNoWhiteSpace]',
  host: {
    '(input)': 'sanitizeValue()',
  },
})
export class AplazoNoWhiteSpaceDirective {
  readonly #elementRef: ElementRef<HTMLInputElement> = inject(ElementRef);
  readonly #ngControl = inject(NgControl, {
    self: true,
    optional: true,
  });

  sanitizeValue(): void {
    const inputElement = this.#elementRef.nativeElement;
    const originalCursorPosition = inputElement.selectionStart;

    const sanitizedValue = inputElement.value.replace(/\s/g, '');

    if (this.#ngControl) {
      this.#ngControl.control?.setValue(sanitizedValue, { emitEvent: false });
    }

    inputElement.value = sanitizedValue;

    if (originalCursorPosition !== null) {
      inputElement.setSelectionRange(
        originalCursorPosition,
        originalCursorPosition
      );
    }
  }
}
