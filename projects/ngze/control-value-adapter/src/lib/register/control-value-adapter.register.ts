import { Injectable } from '@angular/core';

import { Adapter } from '../shared';

import { ControlValueAdapterRegisterImpl } from './control-value-adapter.register.impl';

/**
 * Registration service for control value adapters.
 */
@Injectable({
  providedIn: 'root',
  useExisting: ControlValueAdapterRegisterImpl,
})
export abstract class ControlValueAdapterRegister {
  /**
   * Registers new control value adapter.
   * @param adapter - Instance of class that implements {@link Adapter} and decorated with {@link ControlValueAdapter}.
   */
  abstract register(adapter: Adapter);

  /**
   * Returns {@link ValueAdapter<S, T>} related to the given name.
   * @param name - Control value adapter name.
   * @returns Control value adapter that related to the given name.
   */
  abstract resolve<S, T>(name: string): Adapter<S, T>;
}
