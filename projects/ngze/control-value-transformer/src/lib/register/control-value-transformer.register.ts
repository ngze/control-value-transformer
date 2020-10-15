import { Injectable } from '@angular/core';

import { Transformer } from '../shared';

import { ControlValueTransformerRegisterImpl } from './control-value-transformer.register.impl';

/**
 * Registration service for control value transformers.
 */
@Injectable({
  providedIn: 'root',
  useExisting: ControlValueTransformerRegisterImpl,
})
export abstract class ControlValueTransformerRegister {
  /**
   * Registers new control value transformer.
   * @param transformer - Instance of class that implements {@link Transformer} and decorated with {@link ControlValueTransformer}.
   */
  abstract register(transformer: Transformer);

  /**
   * Returns {@link Transformer<S, T>} related to the given name.
   * @param name - Control value transformer name.
   * @returns Control value transformer that related to the given name.
   */
  abstract resolve<S, T>(name: string): Transformer<S, T>;
}
