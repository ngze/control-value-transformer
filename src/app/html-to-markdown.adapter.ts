import * as showdown from 'showdown';
import * as turndown from 'turndown';

import { ControlValueAdapter, Adapter } from '@ngze/control-value-adapter';

@ControlValueAdapter({
  name: 'html-to-markdown',
})
export class HtmlToMarkdownAdapter implements Adapter<string, string> {
  private readonly turndown = new turndown.default();
  private readonly showdown = new showdown.Converter();

  toTarget(html: string): string {
    return html ? this.turndown.turndown(html) : null;
  }

  toSource(markdown: string): string {
    return markdown ? this.showdown.makeHtml(markdown) : null;
  }
}
