import { NgModule } from '@angular/core';

import { ControlValueTransformerDirective } from './directive';

/**
 * Control value transformer module.
 */
@NgModule({
  declarations: [ControlValueTransformerDirective],
  exports: [ControlValueTransformerDirective],
})
export class ControlValueTransformerModule {}
