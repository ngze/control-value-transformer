import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgControl } from '@angular/forms';

import { ControlValueAdapterRegister } from '../register';
import { Adapter } from '../shared';

/**
 * The control value adapter directive allows to supply different value type to components that implements
 * `ControlValueAccessor` by transforming value in two-ways, before writing new value and after value change.
 */
@Directive({
  selector: '[formControl][controlValueAdapter], [ngModel][controlValueAdapter]',
})
export class ControlValueAdapterDirective<S, T> implements OnChanges {
  /**
   * Control value adapter name.
   */
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('controlValueAdapter')
  readonly controlValueAdapterName: string;

  /**
   * Emits {@link Adapter<S, T>} on {@link controlValueAdapterName} changes.
   */
  controlValueAdapter: Adapter<S, T>;

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
    private readonly controlValueAdapterRegister: ControlValueAdapterRegister
  ) {
    this.ngControl.valueAccessor.registerOnChange = this.registerOnChange;
    this.ngControl.valueAccessor.writeValue = this.writeValue;
  }

  ngOnChanges({ controlValueAdapterName }: SimpleChanges) {
    if (controlValueAdapterName) {
      this.controlValueAdapter = this.controlValueAdapterRegister.resolve(this.controlValueAdapterName) as Adapter<
        S,
        T
      >;
    }
  }

  /**
   * Patches the given `onChange` method by transforming the incoming target values to
   * the source value type and than call the original `onChange` function.
   */
  registerOnChange = (onChange: (sourceValue: S) => void) => {
    this.originalRegisterOnChange.call(this.ngControl.valueAccessor, (targetValue: T) => {
      if (this.controlValueAdapter) {
        const sourceValue = this.controlValueAdapter.toSource(targetValue, this.currentSourceValue);
        onChange(sourceValue);
        this.writeValue(sourceValue);
      }
    });
  };

  /**
   * Transforms the provided source value to the target value type and than call the original `writeValue` implementation.
   */
  writeValue = (sourceValue: S) => {
    if (this.controlValueAdapter) {
      this.currentSourceValue = sourceValue;
      const targetValue = this.controlValueAdapter.toTarget(sourceValue);
      this.originalWriteValue.call(this.ngControl.valueAccessor, targetValue);
    }
  };
}
