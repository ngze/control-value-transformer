import { ControlValueAdapter, Adapter } from '@ngze/control-value-adapter';

@ControlValueAdapter({
  name: 'emoji-password',
})
export class PasswordToEmojiAdapter implements Adapter<string, string> {
  private readonly emojis = ['🤫', '🤐', '😷', '😑', '😶', '🤭'];

  toTarget(password: string): string {
    return Array.from(password || '')
      .map((char, index) => this.emojis[index % this.emojis.length])
      .join('');
  }

  toSource(emojiPassword: string, currentSourcePassword: string): string {
    if (!emojiPassword || !currentSourcePassword) {
      return emojiPassword;
    }

    const { 0: characters, index } = emojiPassword.match(/[^\u00FF-\uFFFF]+/);
    return currentSourcePassword.substring(0, index) + characters + currentSourcePassword.substring(index);
  }
}
