/**
 * Interface that represents value transformer.
 * `S` - Source value type.
 * `T` - Target value type.
 */
export interface Transformer<S = unknown, T = unknown> {
  /**
   * Transforms the given source value (`S`) to the target value type (`T`).
   */
  toTarget: (sourceValue: S) => T;

  /**
   * Transforms the given target value (`T`) to the source value type (`S`).
   */
  toSource: (targetValue: T) => S;
}
