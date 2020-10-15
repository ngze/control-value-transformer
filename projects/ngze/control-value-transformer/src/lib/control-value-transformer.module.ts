import { Inject, InjectionToken, ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { Class } from 'utility-types';

import { ControlValueTransformerRegister } from './register';
import { ControlValueTransformerDirective } from './directive';
import { Transformer } from './shared';

/**
 * Injection token that used to run {@link registerControlValueTransformers}.
 */
export const REGISTER_CONTROL_VALUE_TRANSFORMERS_FACTORY = new InjectionToken<void>(
  'CONTROL_VALUE_TRANSFORMERS_REGISTRATION_FACTORY'
);

/**
 * Registration factory for new control value transformers.
 * @param controlValueTransformerRegister - Registration service for control value transformers.
 * @param controlValueTransformers - Control value transformers to register.
 */
export function registerControlValueTransformers(
  controlValueTransformerRegister: ControlValueTransformerRegister,
  ...controlValueTransformers: Transformer[]
) {
  controlValueTransformers.forEach((controlValueTransformer) =>
    controlValueTransformerRegister.register(controlValueTransformer)
  );
}

/**
 * Control value transformer module.
 */
@NgModule({
  declarations: [ControlValueTransformerDirective],
  exports: [ControlValueTransformerDirective],
})
export class ControlValueTransformerModule {
  /**
   * Registers new control value transformers.
   * @param controlValueTransformers - List of classes that implements {@link Transformer}
   * and decorated with {@link ControlValueTransformer}.
   */
  static registerTransformers(
    controlValueTransformers: Class<Transformer>[]
  ): ModuleWithProviders<ControlValueTransformerModule> {
    return {
      ngModule: ControlValueTransformerModule,
      providers: [
        ...controlValueTransformers,
        {
          provide: REGISTER_CONTROL_VALUE_TRANSFORMERS_FACTORY,
          useFactory: registerControlValueTransformers,
          deps: [ControlValueTransformerRegister, ...controlValueTransformers],
        },
      ],
    };
  }

  constructor(
    @Optional()
    @Inject(REGISTER_CONTROL_VALUE_TRANSFORMERS_FACTORY)
    controlValueTransformersRegistrationFactory: void
  ) {}
}
