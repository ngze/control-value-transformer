import { Injectable } from '@angular/core';

import { getControlValueTransformerMetadata } from '../metadata';
import { Transformer } from '../shared';

import { ControlValueTransformerRegister } from './control-value-transformer.register';

/**
 * Implementation of {@link ControlValueTransformerRegister}.
 */
@Injectable({
  providedIn: 'root',
})
export class ControlValueTransformerRegisterImpl implements ControlValueTransformerRegister {
  /**
   * Map between control value transformer name and its associated implementation.
   */
  readonly controlValueTransformers = new Map<string, Transformer>();

  register(controlValueTransformer: Transformer) {
    const metadata = getControlValueTransformerMetadata(controlValueTransformer);
    this.assertControlValueTransformerNotExists(metadata.name);

    this.controlValueTransformers.set(metadata.name, controlValueTransformer);
  }

  resolve<S, T>(name: string): Transformer<S, T> {
    this.assertControlValueTransformerExists(name);
    return this.controlValueTransformers.get(name) as Transformer<S, T>;
  }

  /**
   * Asserts the given control value transformer name does not exists in {@link controlValueTransformers}.
   * @param name - Control value transformer name.
   */
  assertControlValueTransformerNotExists(name: string) {
    if (this.controlValueTransformers.has(name)) {
      throw new TypeError(
        `Control value transformer name should be unique, but found more than one transformer with the same name: "${name}".`
      );
    }
  }

  /**
   * Asserts the given control value transformer name exists in {@link controlValueTransformers}.
   * @param name - Control value transformer name.
   */
  assertControlValueTransformerExists(name: string) {
    if (!this.controlValueTransformers.has(name)) {
      throw new TypeError(`Could not find control value transformer with name "${name}".`);
    }
  }
}
