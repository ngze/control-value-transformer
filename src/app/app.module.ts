import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ControlValueTransformerModule } from '@ngze/control-value-transformer';

import { AppComponent } from './app.component';

import { HtmlToMarkdownTransformer } from './html-to-markdown.transformer';
import { PasswordToEmojiTransformer } from './password-to-emoji.transformer';
import { NumberTransformer } from './number.transformer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ControlValueTransformerModule.registerTransformers([
      HtmlToMarkdownTransformer,
      PasswordToEmojiTransformer,
      NumberTransformer,
    ]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
