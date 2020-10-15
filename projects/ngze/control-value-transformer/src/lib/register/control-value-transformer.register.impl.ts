import { getTransformerMetadata } from '../metadata';
import { Transformer } from '../shared';

import { ControlValueTransformerRegister } from './control-value-transformer.register';

/**
 * Implementation of {@link ControlValueTransformerRegister}.
 */
export class ControlValueTransformerRegisterImpl implements ControlValueTransformerRegister {
  /**
   * Map between control value transformer name and its related implementation instance.
   */
  readonly transformers = new Map<string, Transformer>();

  register(transformer: Transformer) {
    const metadata = getTransformerMetadata(transformer);
    this.assertTransformerNotExists(metadata.name);

    this.transformers.set(metadata.name, transformer);
  }

  resolve<S, T>(name: string): Transformer<S, T> {
    this.assertTransformerExists(name);
    return this.transformers.get(name) as Transformer<S, T>;
  }

  /**
   * Asserts the given control transformer name does not exists in {@link transformers}.
   * @param name - Control value transformer name.
   */
  assertTransformerNotExists(name: string) {
    if (this.transformers.has(name)) {
      throw new TypeError(
        `Control value transformer name should be unique, but found more than one transformer with the same name: "${name}".`
      );
    }
  }

  /**
   * Asserts the given control transformer name exists in {@link transformers}.
   * @param name - Control value transformer name.
   */
  assertTransformerExists(name: string) {
    if (!this.transformers.has(name)) {
      throw new TypeError(`Could not find control value transformer with name "${name}".`);
    }
  }
}
