import { Inject, Injectable, InjectionToken } from '@angular/core';
import { ControlValueTransformer, Transformer } from '@ngze/control-value-transformer';

export const EMOJIS = new InjectionToken<string[]>('EMOJIS', {
  providedIn: 'root',
  factory: () => ['🤫', '🤐', '😷', '😑', '😶', '🤭'],
});

@Injectable()
@ControlValueTransformer({
  name: 'emoji-password',
})
export class PasswordToEmojiTransformer implements Transformer<string, string> {
  currentPassword: string;

  constructor(@Inject(EMOJIS) private readonly emojis: string[]) {}

  toTarget(password: string): string {
    this.currentPassword = password;
    return Array.from(password || '')
      .map((char, index) => this.emojis[index % this.emojis.length])
      .join('');
  }

  toSource(emojiPassword: string): string {
    if (!emojiPassword || !this.currentPassword) {
      return emojiPassword;
    }

    const { 0: characters, index } = emojiPassword.match(/[^\u00FF-\uFFFF]+/);
    return this.currentPassword.substring(0, index) + characters + this.currentPassword.substring(index);
  }
}
