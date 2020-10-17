import { Injectable } from '@angular/core';

import { getControlValueAdapterMetadata } from '../metadata';
import { Adapter } from '../shared';

import { ControlValueAdapterRegister } from './control-value-adapter.register';

/**
 * Implementation of {@link ControlValueAdapterRegister}.
 */
@Injectable({
  providedIn: 'root',
})
export class ControlValueAdapterRegisterImpl implements ControlValueAdapterRegister {
  /**
   * Map between control value adapter name and its related implementation instance.
   */
  readonly adapters = new Map<string, Adapter>();

  register(adapter: Adapter) {
    const metadata = getControlValueAdapterMetadata(adapter);
    this.assertAdapterNotExists(metadata.name);

    this.adapters.set(metadata.name, adapter);
  }

  resolve<S, T>(name: string): Adapter<S, T> {
    this.assertAdapterExists(name);
    return this.adapters.get(name) as Adapter<S, T>;
  }

  /**
   * Asserts the given control adapter name does not exists in {@link adapters}.
   * @param name - Control value adapter name.
   */
  assertAdapterNotExists(name: string) {
    if (this.adapters.has(name)) {
      throw new TypeError(
        `Control value adapter name should be unique, but found more than one adapter with the same name: "${name}".`
      );
    }
  }

  /**
   * Asserts the given control adapter name exists in {@link adapters}.
   * @param name - Control value adapter name.
   */
  assertAdapterExists(name: string) {
    if (!this.adapters.has(name)) {
      throw new TypeError(`Could not find control value adapter with name "${name}".`);
    }
  }
}
