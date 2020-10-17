import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ControlValueAdapterModule } from '@ngze/control-value-adapter';

import { AppComponent } from './app.component';

import { HtmlToMarkdownAdapter } from './html-to-markdown.adapter';
import { PasswordToEmojiAdapter } from './password-to-emoji.adapter';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ControlValueAdapterModule.registerAdapters([HtmlToMarkdownAdapter, PasswordToEmojiAdapter]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
