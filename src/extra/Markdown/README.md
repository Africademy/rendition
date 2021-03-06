# Markdown

A simple component for rendering [GitHub flavored markdown](https://github.github.com/gfm/). This component
sanitizes input.
This component is not loaded by default as it relies on a markdown parsing package 
that you may not want to include in your application.
You can load this component using:

```
import { Markdown } from 'rendition/dist/extra/Markdown';
```

If you need to customize the conversion of markdown to HTML you can supply the `sanitizerOptions` prop. In this case, use the defaults as a starting point for your options:

```
import { Markdown, defaultSanitizerOptions } from 'rendition/dist/extra/Markdown';
```


[View story source](https://github.com/balena-io-modules/rendition/blob/master/src/extra/Markdown/story.js)

## Props

| Name   | Type   | Default   | Required   | Description   |
| ------ | ------ | --------- | ---------- | ------------- |
| `children`  | `string` | - | ✓ | The markdown source that should be rendered |
| `sanitizerOptions` | [`sanitizeHtml.IOptions`](https://github.com/apostrophecms/sanitize-html#how-to-use) | (See `extra/utils/defaultSanitizerOptions`) | - | Specifies the options used when sanitizing the generated HTML. |

Any other properties supplied are spread to the root element ([`Txt`](#txt)).

## Inheritance

The properties of the [`Txt`](#txt) component are also available.
