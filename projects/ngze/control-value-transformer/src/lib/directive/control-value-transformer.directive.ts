import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgControl } from '@angular/forms';

import { ControlValueTransformerRegister } from '../register';
import { Transformer } from '../shared';

/**
 * The control value transformer directive allows to supply different value type to components that implements
 * `ControlValueAccessor` by transforming value in two-ways, before writing new value and after value change.
 */
@Directive({
  selector: '[formControl][controlValueTransformer], [ngModel][controlValueTransformer]',
})
export class ControlValueTransformerDirective<S, T> implements OnChanges {
  /**
   * Control value transformer name.
   */
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('controlValueTransformer')
  readonly controlValueTransformerName: string;

  /**
   * Indicates if the control value should be re-transformed after `onChange`.
   */
  @Input()
  readonly transformOnChange: boolean;

  /**
   * Emits {@link Transformer<S, T>} on {@link controlValueTransformerName} changes.
   */
  controlValueTransformer: Transformer<S, T>;

  /**
   * Reference to the current incoming source value.
   */
  currentSourceValue: S;

  /**
   * The original implementations of {@link ngControl.valueAccessor.writeValue}.
   */
  private readonly originalWriteValue = this.ngControl.valueAccessor.writeValue;

  /**
   * The original implementations of {@link ngControl.valueAccessor.registerOnChange}.
   */
  private readonly originalRegisterOnChange = this.ngControl.valueAccessor.registerOnChange;

  constructor(
    private readonly ngControl: NgControl,
    private readonly controlValueTransformerRegister: ControlValueTransformerRegister
  ) {
    this.ngControl.valueAccessor.registerOnChange = this.registerOnChange;
    this.ngControl.valueAccessor.writeValue = this.writeValue;
  }

  ngOnChanges({ controlValueTransformerName }: SimpleChanges) {
    if (controlValueTransformerName) {
      this.controlValueTransformer = this.controlValueTransformerRegister.resolve(
        this.controlValueTransformerName
      ) as Transformer<S, T>;
    }
  }

  /**
   * Patches the given `onChange` method by transforming the incoming target values to
   * the source value type and than call the original `onChange` function.
   */
  registerOnChange = (onChange: (sourceValue: S) => void) => {
    this.originalRegisterOnChange.call(this.ngControl.valueAccessor, (targetValue: T) => {
      if (this.controlValueTransformer) {
        const sourceValue = this.controlValueTransformer.toSource(targetValue, this.currentSourceValue);

        if (this.transformOnChange) {
          this.writeValue(sourceValue);
        }

        onChange(sourceValue);
      }
    });
  };

  /**
   * Transforms the provided source value to the target value type and than call the original `writeValue` implementation.
   */
  writeValue = (sourceValue: S) => {
    if (this.controlValueTransformer) {
      this.currentSourceValue = sourceValue;
      const targetValue = this.controlValueTransformer.toTarget(sourceValue);
      this.originalWriteValue.call(this.ngControl.valueAccessor, targetValue);
    }
  };
}
