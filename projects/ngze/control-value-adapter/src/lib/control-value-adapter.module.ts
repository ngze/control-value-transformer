import { Inject, InjectionToken, ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { Class } from 'utility-types';

import { ControlValueAdapterRegister } from './register';
import { ControlValueAdapterDirective } from './directive';
import { Adapter } from './shared';

/**
 * Injection token that used to run {@link registerControlValueAdapters}.
 */
export const REGISTER_CONTROL_VALUE_ADAPTERS_FACTORY = new InjectionToken<void>(
  'REGISTER_CONTROL_VALUE_ADAPTERS_FACTORY'
);

/**
 * Registration factory for new control value adapters.
 * @param controlValueAdapterRegister - Registration service for control value adapter.
 * @param controlValueAdapters - Control value adapters to register.
 */
export function registerControlValueAdapters(
  controlValueAdapterRegister: ControlValueAdapterRegister,
  ...controlValueAdapters: Adapter[]
) {
  controlValueAdapters.forEach((controlValueAdapter) => controlValueAdapterRegister.register(controlValueAdapter));
}

/**
 * Control value adapter module.
 */
@NgModule({
  declarations: [ControlValueAdapterDirective],
  exports: [ControlValueAdapterDirective],
})
export class ControlValueAdapterModule {
  /**
   * Registers new control value adapters.
   * @param controlValueAdapters - List of classes that implements {@link Adapter}
   * and decorated with {@link ControlValueAdapter}.
   */
  static registerAdapters(controlValueAdapters: Class<Adapter>[]): ModuleWithProviders<ControlValueAdapterModule> {
    return {
      ngModule: ControlValueAdapterModule,
      providers: [
        ...controlValueAdapters,
        {
          provide: REGISTER_CONTROL_VALUE_ADAPTERS_FACTORY,
          useFactory: registerControlValueAdapters,
          deps: [ControlValueAdapterRegister, ...controlValueAdapters],
        },
      ],
    };
  }

  constructor(
    @Optional()
    @Inject(REGISTER_CONTROL_VALUE_ADAPTERS_FACTORY)
    registerControlValueAdapters: void
  ) {}
}
