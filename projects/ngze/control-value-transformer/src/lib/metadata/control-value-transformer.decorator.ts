import { Class } from 'utility-types';

import { Transformer } from '../shared';

import { ControlValueTransformerMetadata } from './control-value-transformer-metadata.interface';
import { definedTransformerMetadata } from './control-value-transformer-metadata.utils';

/**
 * Decorator that used to define metadata related to control value transformers.
 * @param metadata - Control value transformer metadata.
 */
export const ControlValueTransformer = (metadata: ControlValueTransformerMetadata) => <T extends Transformer>(
  transformerClass: Class<T>
): Class<T> => {
  definedTransformerMetadata(transformerClass, metadata);
  return transformerClass;
};
