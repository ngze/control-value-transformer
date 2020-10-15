import { Class } from 'utility-types';

import { Transformer } from '../shared';

import { ControlValueTransformerMetadata } from './control-value-transformer-metadata.interface';
import { definedControlValueTransformerMetadata } from './control-value-transformer-metadata.utils';

/**
 * Decorator used to define required metadata on control value transformers.
 * @param metadata - Control value transformer metadata.
 */
export const ControlValueTransformer = (metadata: ControlValueTransformerMetadata) => <T extends Transformer>(
  transformerClass: Class<T>
): Class<T> => {
  definedControlValueTransformerMetadata(transformerClass, metadata);
  return transformerClass;
};
