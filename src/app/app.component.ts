import { Component } from '@angular/core';
import { PrefixTransformer } from './prefix.transformer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  html: string;
  password: string;
  number: number;
  url: string;
  httpsPrefixTransformer = new PrefixTransformer('https://');
}
