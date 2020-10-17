import { Class } from 'utility-types';

import { Adapter } from '../shared';

import { ControlValueAdapterMetadata } from './control-value-adapter-metadata.interface';

/**
 * Unique symbol that used as a key to define and read metadata related to control value adapter.
 */
const CONTROL_VALUE_ADAPTER_METADATA = Symbol('CONTROL_VALUE_ADAPTER_METADATA');

/**
 * Asserts the given adapter class is decorated with {@link ControlValueAdapter}.
 * @param adapter - Instance of control value adapter that should be decorated.
 */
const assertAdapterIsDecorated = (adapter: Adapter) => {
  const hasMetadata = Reflect.hasMetadata(CONTROL_VALUE_ADAPTER_METADATA, adapter.constructor);

  if (!hasMetadata) {
    throw new TypeError(`"${adapter.constructor}" is not decorated with ControlValueAdapter.`);
  }
};

/**
 * Returns metadata related to the given control value adapter.
 * @param adapter - Instance of control value adapter.
 * @returns Control value adapter metadata.
 */
export const getControlValueAdapterMetadata = (adapter: Adapter): ControlValueAdapterMetadata => {
  assertAdapterIsDecorated(adapter);

  return Reflect.getMetadata(CONTROL_VALUE_ADAPTER_METADATA, adapter.constructor);
};

/**
 * Defines metadata on the given control value adapter class.
 * @param adapterClass - Class that implements {@link Adapter}.
 * @param metadata - Control value adapter metadata.
 */
export const definedControlValueAdapterMetadata = (
  adapterClass: Class<Adapter>,
  metadata: ControlValueAdapterMetadata
) => {
  return Reflect.defineMetadata(CONTROL_VALUE_ADAPTER_METADATA, metadata, adapterClass);
};
