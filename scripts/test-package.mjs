import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { renderToString } from '@vue/server-renderer'
import { createSSRApp, h } from 'vue'

const require = createRequire(import.meta.url)
const packageName = '@leo91000/vue-tiptap-renderer'

for (const [format, library] of [
  ['ESM', await import(packageName)],
  ['CommonJS', require(packageName)],
]) {
  const content = {
    type: 'doc',
    content: [{
      type: 'paragraph',
      content: [{
        type: 'text',
        text: 'Visit Eliah',
        marks: [
          { type: 'bold' },
          { type: 'link', attrs: { href: 'https://eliah.fr', target: '_blank' } },
          { type: 'textStyle', attrs: { color: 'red' } },
        ],
      }],
    }],
  }
  const html = await renderToString(createSSRApp({ render: () => h(library.JsonRenderer, { content }) }))
  assert.match(html, /href="https:\/\/eliah.fr"/)
  assert.match(html, /target="_blank"/)
  assert.match(html, /rel="noopener noreferrer"/)
  assert.match(html, /style="color:red;"/)
  assert.match(html, /<strong>Visit Eliah<\/strong>/)
  assert.equal(library.getContentWordCount(content), 2)
  assert.equal(library.extractContentText(content), 'Visit Eliah\n')
  assert.equal(library.getContentFirstImage(content), null)
  assert.equal(library.emptyJsonContent.type, 'doc')
  console.log(`${format} exports and server rendering passed`)
}
