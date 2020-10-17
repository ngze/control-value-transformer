import { Class } from 'utility-types';

import { Adapter } from '../shared';

import { ControlValueAdapterMetadata } from './control-value-adapter-metadata.interface';
import { definedControlValueAdapterMetadata } from './control-value-adapter-metadata.utils';

/**
 * Decorator that used to define metadata related to control value adapters.
 * @param metadata - Control value adapter metadata.
 */
export const ControlValueAdapter = (metadata: ControlValueAdapterMetadata) => <T extends Adapter>(
  adapterClass: Class<T>
): Class<T> => {
  definedControlValueAdapterMetadata(adapterClass, metadata);
  return adapterClass;
};
