<br />

<p align="center">
<img width="175px" src="./logo.svg">
</p>

<br />

[![codecov](https://codecov.io/gh/ngze/control-value-transformer/branch/develop/graph/badge.svg)](https://codecov.io/gh/ngze/control-value-transformer)
[![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg?style=flat-square)]()
[![commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
[![ngze](https://img.shields.io/badge/@-ngze-383636?style=flat-square&labelColor=474768)](https://github.com/ngze/)
[![spectator](https://img.shields.io/badge/tested%20with-spectator-2196F3.svg?style=flat-square)]()

> A proper way for transforming `ControlValueAccessor` values in two-ways

Have you ever needed to transform a value right before passing it into `ControlValueAccessor`? and transform it back to its original value type after every change? If so, you probably found that it's not so straightforward.

**Control Value Transformer** main purpose is to simplify the way of transforming form/control values by hooking into two lifecycles of `ControlValueAccessor`, right before it's getting a new value and after every value change.

## Features

✅&nbsp;&nbsp;Support two-ways transformation of `ControlValueAccessor` values
<br />
✅&nbsp;&nbsp;Super easy to create and use new transformers
<br />
✅&nbsp;&nbsp;Support both Template Drive and Reactive forms
<br />
✅&nbsp;&nbsp;Cross-app singleton transformers

## Installation
```
ng add @ngze/control-value-transformer
```

Add the `ControlValueTransformerModule` to your `AppModule`:

```ts
import { ControlValueTransformerModule } from '@ngze/control-value-transformer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule, 
    ControlValueTransformerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
``` 

## Create and Use Control Value Transformers
To create a new control value transformer all you need is implementing the `Transformer` interface.
<br />
Here is an example of a simple transformer that transforms a number into a string via `DecimalPipe` just before inserting it into an input, and transforms it back to a number on every change: 

```ts
import { DecimalPipe } from '@angular/common';
import { Transformer } from '@ngze/control-value-transformer';

export class NumberTransformer implements Transformer<number, string> {
  private readonly decimalPipe = new DecimalPipe('en');

  toTarget(number: number): string {
    return this.decimalPipe.transform(number);
  }

  toSource(string: string): number {
    return Number(string.replace(/[^0-9 ]/g, ''));
  }
}
```

Now you can use it on any component that implements `ControlValueAccessor` and expects to receive a string as value by using the `controlValueTransformer` directive:

```ts
@Component({
  template: `
    <div>
      <div>You number: {{number}}</h1>
      <input [(ngModel)]="number" [controlValueTransformer]="numberTransformer" />
    <div>
  `
})
class MyComponent {
  number: number;
  numberTransformer = new NumberTransformer();
}
```

The same `NumberTransformer` can seamlessly work with `FormControl` as well:
```ts
@Component({
  template: `
    <div>
      <div>You number: {{numberControl.value}}</h1>
      <input [formControl]="numberControl" [controlValueTransformer]="numberTransformer" />
    <div>
  `
})
class MyComponent {
  numberControl = new FormControl();
  numberTransformer = new NumberTransformer();
}
```

### Inputs

| @Input                  | Type                           | Description                                                                                      | Default |
|-------------------------|--------------------------------|--------------------------------------------------------------------------------------------------|---------|
| controlValueTransformer | `Transformer<S, T> \| string`  | Control value transformer instance or its name                                                   | -       |
| rewriteValueOnChange    | `boolean`                      | Indicates if `writeValue` should be called with the transformed value after each `onChange` call | `true`  |

### Singleton Control Value Transformers

Singleton control value transformers allow you to use a shared transformer instance cross-app.
<br/>
You can define it simply by decorating your class with `ControlValueTransformer`:

```ts
import { DecimalPipe } from '@angular/common';
import { ControlValueTransformer, Transformer } from '@ngze/control-value-transformer';

@ControlValueTransformer({
  name: 'number'
})
export class NumberTransformer implements Transformer<number, string> {
  private readonly decimalPipe = new DecimalPipe('en');

  toTarget(number: number): string {
    return this.decimalPipe.transform(number);
  }

  toSource(string: string): number {
    return Number(string.replace(/[^0-9 ]/g, ''));
  }
}
```
  
Next step is registering the control value transfomer to make it available all over the app:

```ts
import { ControlValueTransformerModule } from '@ngze/control-value-transformer';

import { NumberTransformer } from './number.transformer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule, 
    ControlValueTransformerModule.register([NumberTransformer])
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
``` 

Now you can use the unique name (`number`) instead of passing transformer instance into `controlValueTransformer` directive:

```ts
@Component({
  template: `
    <div>
      <div>You number: {{number}}</h1>
      <input [(ngModel)]="number" [controlValueTransformer]="'number'" />
    <div>
  `
})
class MyComponent {
  number: number;
}
```

### Using Dependencies Injection

By default, registered control value transformers can be injected as traditional providers:
```ts
@Component(...)
class MyComponent {
  constructor(private readonly numberTransformer: NumberTransformer) {}
  ...
}
```

Adding `Injectable` on the transformer class will allow you to inject any available provider:

```ts
import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ControlValueTransformer } from '@ngze/control-value-transformer';

@Injectable()
@ControlValueTransformer({
  name: 'number'
})
export class NumberTransformer implements Transformer<number, string> {
  private readonly decimalPipe = new DecimalPipe(this.localId);

  constructor(@Inject(LOCALE_ID) private readonly localId: string) {}

  toTarget(number: number): string {
    return this.decimalPipe.transform(number);
  }

  toSource(string: string): number {
    return Number(string.replace(/[^0-9 ]/g, ''));
  }
}
```

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://il.linkedin.com/in/zeev-katz"><img src="https://avatars0.githubusercontent.com/u/21024245?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Zeev Katz</b></sub></a><br /><a href="https://github.com/@ngze/control-value-transformer/commits?author=ZeevKatz" title="Code"> 💻 </a> <a href="https://github.com/@ngze/control-value-transformer/commits?author=ZeevKatz" title="Documentation"> 📖 </a> <a href="#ideas-ZeevKatz" title="Ideas, Planning, & Feedback"> 🤔 </a> <a href="#maintenance-ZeevKatz" title="Maintenance"> 🚧 </a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
