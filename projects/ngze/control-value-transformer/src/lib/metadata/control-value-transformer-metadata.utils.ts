import { Class } from 'utility-types';

import { Transformer } from '../shared';

import { ControlValueTransformerMetadata } from './control-value-transformer-metadata.interface';

/**
 * Unique symbol used as a key to define and read metadata related to control value transformers.
 */
const CONTROL_VALUE_TRANSFORMER_METADATA = Symbol('CONTROL_VALUE_TRANSFORMER_METADATA');

/**
 * Returns metadata property descriptor associate with the given control value transformer.
 * @param transformer - Instance of control value transformer that should be decorated.
 * @returns Transformer metadata property descriptor.
 */
const getTransformerMetadataPropertyDescriptor = (transformer: Transformer) => {
  return Object.getOwnPropertyDescriptor(transformer.constructor, CONTROL_VALUE_TRANSFORMER_METADATA);
};

/**
 * Asserts the given transformer class is decorated with {@link Transformer}.
 * @param transformer - Instance of control value transformer that should be decorated.
 */
const assertTransformerIsDecorated = (transformer: Transformer) => {
  if (!getTransformerMetadataPropertyDescriptor(transformer)) {
    throw new TypeError(`"${transformer.constructor}" is not decorated with ControlValueTransformer.`);
  }
};

/**
 * Returns metadata associate with the given control value transformer.
 * @param transformer - Instance of control value transformer.
 * @returns Control value transformer metadata.
 */
export const getControlValueTransformerMetadata = (transformer: Transformer): ControlValueTransformerMetadata => {
  assertTransformerIsDecorated(transformer);
  const metadataPropertyDescriptor = getTransformerMetadataPropertyDescriptor(transformer);
  return metadataPropertyDescriptor.value;
};

/**
 * Defines metadata on the given control value transformer class.
 * @param transformerClass - Class that implements {@link Transformer}.
 * @param metadata - Control value transformer metadata.
 */
export const definedControlValueTransformerMetadata = (
  transformerClass: Class<Transformer>,
  metadata: ControlValueTransformerMetadata
) => {
  return Object.defineProperty(transformerClass, CONTROL_VALUE_TRANSFORMER_METADATA, {
    value: metadata,
  });
};
