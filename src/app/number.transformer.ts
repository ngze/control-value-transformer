import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ControlValueTransformer, Transformer } from '@ngze/control-value-transformer';

@Injectable()
@ControlValueTransformer({
  name: 'number',
})
export class NumberTransformer implements Transformer<number, string> {
  private readonly decimalPipe = new DecimalPipe(this.localeId);

  constructor(@Inject(LOCALE_ID) private readonly localeId: string) {}

  toTarget(number: number): string {
    return this.decimalPipe.transform(number);
  }

  toSource(string: string): number {
    return Number(string.replace(/[^0-9 ]/g, ''));
  }
}
