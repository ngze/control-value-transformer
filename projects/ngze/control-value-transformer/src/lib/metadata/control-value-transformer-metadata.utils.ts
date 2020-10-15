import { Class } from 'utility-types';

import { Transformer } from '../shared';

import { ControlValueTransformerMetadata } from './control-value-transformer-metadata.interface';

/**
 * Unique symbol that used as a key to define and read metadata related to control value transformer.
 */
const CONTROL_VALUE_TRANSFORMER_METADATA = Symbol('CONTROL_VALUE_TRANSFORMER_METADATA');

/**
 * Asserts the given transformer class is decorated with {@link ControlValueTransformer}.
 * @param transformer - Instance of control value transformer that should be decorated.
 */
const assertTransformerIsDecorated = (transformer: Transformer) => {
  const hasMetadata = Reflect.hasMetadata(CONTROL_VALUE_TRANSFORMER_METADATA, transformer.constructor);

  if (!hasMetadata) {
    throw new TypeError(`"${transformer.constructor}" is not decorated with ControlValueTransformer.`);
  }
};

/**
 * Returns metadata related to the given control value transformer.
 * @param transformer - Instance of control value transformer.
 * @returns Control value transformer metadata.
 */
export const getTransformerMetadata = (transformer: Transformer): ControlValueTransformerMetadata => {
  assertTransformerIsDecorated(transformer);

  return Reflect.getMetadata(CONTROL_VALUE_TRANSFORMER_METADATA, transformer.constructor);
};

/**
 * Defines metadata on the given control value transformer class.
 * @param transformerClass - Class that implements {@link Transformer}.
 * @param metadata - Control value transformer metadata.
 */
export const definedTransformerMetadata = (
  transformerClass: Class<Transformer>,
  metadata: ControlValueTransformerMetadata
) => {
  return Reflect.defineMetadata(CONTROL_VALUE_TRANSFORMER_METADATA, metadata, transformerClass);
};
