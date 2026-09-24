# Vue Tiptap Renderer

[![npm version](https://img.shields.io/npm/v/@leo91000/vue-tiptap-renderer)](https://www.npmjs.com/package/@leo91000/vue-tiptap-renderer)
[![CI](https://github.com/leo91000/vue-tiptap-renderer/actions/workflows/ci.yml/badge.svg)](https://github.com/leo91000/vue-tiptap-renderer/actions/workflows/ci.yml)
[![Coverage](https://img.shields.io/codecov/c/gh/leo91000/vue-tiptap-renderer/main)](https://codecov.io/gh/leo91000/vue-tiptap-renderer)

Render Tiptap JSON as Vue elements, without creating an editor instance. Includes TypeScript declarations, ESM and CommonJS exports, and text/image utilities.

## Installation

```sh
pnpm add @leo91000/vue-tiptap-renderer
# or: npm install @leo91000/vue-tiptap-renderer
```

Vue is a peer dependency. The package uses `vue-demi` for Vue 2/3 compatibility; automated rendering tests run on Vue 3. Vue 2.6 and earlier also require `@vue/composition-api`. No stylesheet is included: style the generated HTML in your application.

## Usage

```vue
<script setup lang="ts">
import type { JSONContent } from '@leo91000/vue-tiptap-renderer'
import { JsonRenderer } from '@leo91000/vue-tiptap-renderer'

const article: JSONContent = {
  type: 'doc',
  content: [{
    type: 'paragraph',
    content: [{
      type: 'text',
      text: 'Visit Eliah',
      marks: [{
        type: 'link',
        attrs: { href: 'https://eliah.fr', target: '_blank' },
      }],
    }],
  }],
}
</script>

<template>
  <JsonRenderer :content="article" />
</template>
```

`content` is the only component prop. A document renders its children without a wrapper element, so it may produce multiple roots. The renderer also works with Vue server rendering.

## Supported content

| Nodes | Output |
| --- | --- |
| `doc` | Child nodes |
| `paragraph`, `heading`, `blockquote` | `p`, `h1`–`h6`, `blockquote` |
| `bulletList`, `orderedList`, `listItem` | `ul`, `ol`, `li` |
| `hardBreak` | `br` |
| `image` | `img` with `src`, `alt`, `title` |
| `text` | Text, or a styled `span` |

| Marks | Output |
| --- | --- |
| `bold`, `italic`, `underline`, `strike` | `strong`, `i`, `u`, `s` |
| `link` | `a` with `href`, `target`, `rel` |
| `textStyle` | Inline `color`, `backgroundColor`, `fontFamily`, `textAlign` |

Style attributes are also read from nodes. Nested marks retain their formatting and link attributes. An explicit, non-empty link `rel` is preserved; otherwise it defaults to `noopener noreferrer`.

Unknown nodes are omitted and emit `console.warn`; unknown marks emit a warning while the text remains. Custom extensions need explicit renderer support. Pass validated editor content: this library does not sanitize URLs or validate a Tiptap schema.

## Utilities

```ts
import {
  emptyJsonContent,
  extractContentText,
  getContentFirstImage,
  getContentWordCount,
} from '@leo91000/vue-tiptap-renderer'
```

- `getContentFirstImage(content)` returns the first image in document order as `{ src, alt, title }`, or `null`.
- `getContentWordCount(content)` counts space-separated segments in each non-empty text node. It is a simple count, not language-aware tokenization.
- `extractContentText(content)` concatenates text nodes, appending a newline after each one.
- `emptyJsonContent` is a shared document object containing an empty paragraph/text node. Clone it before editing it.
- `JSONContent` is re-exported as a TypeScript type from Tiptap.

## Development

Use Node 24 (`mise install`) and the pnpm version pinned in `package.json`.

```sh
pnpm install --frozen-lockfile
pnpm test             # ESLint, TypeScript, unit tests
pnpm test:coverage    # Unit tests and coverage/lcov.info
pnpm build            # dist/index.mjs, index.cjs and declarations
pnpm test:package     # ESM/CommonJS exports and SSR smoke tests
pnpm pack             # Build and create the publishable tarball
```

CI runs on Node 22 and 24, installs from the frozen lockfile, and checks lint, types, coverage, builds, package exports and packing. TypeScript stays on 5.9 while the build tooling requires that version.

## Releases

The `release.yml` workflow publishes version tags to npm with provenance, after the same checks as CI, then creates a GitHub release. The tag must match `package.json` and its commit must belong to `main`.

Configure an npm [trusted publisher](https://docs.npmjs.com/trusted-publishers/) for `@leo91000/vue-tiptap-renderer`: GitHub owner `leo91000`, repository `vue-tiptap-renderer`, workflow `release.yml`, no environment, publishing allowed. No npm token is stored in GitHub.

1. Update `package.json` and `CHANGELOG.md` for the next version.
2. Run the development checks above, commit and push to `main`.
3. Wait for CI, then create and push the matching tag (for example `v0.2.8`).
4. Verify the release workflow and the version on npm.

See [CHANGELOG.md](./CHANGELOG.md) for release history and [LICENSE](./LICENSE) for the MIT license.
