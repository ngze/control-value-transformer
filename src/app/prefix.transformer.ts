import { Transformer } from '@ngze/control-value-transformer';

export class PrefixTransformer implements Transformer<string, string> {
  constructor(private readonly prefix: string) {}

  toTarget(text: string): string {
    return text ? this.prefix.concat(text) : text;
  }

  toSource(text: string): string {
    return text ? text.replace(this.prefix, '') : text;
  }
}
