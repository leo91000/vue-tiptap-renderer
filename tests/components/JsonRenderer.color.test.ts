import type { JSONContent } from '../../src'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent } from 'vue'
import { JsonRenderer } from '../../src'

const WrappedJsonRenderer = defineComponent({
  components: { JsonRenderer },
  props: {
    content: {
      type: Object as () => JSONContent,
      required: true,
    },
  },
  template: '<JsonRenderer v-bind="$props" />',
})

describe('jsonRenderer color support', () => {
  it('renders text with inline color from textStyle mark', () => {
    const wrapper = mount(WrappedJsonRenderer, {
      props: {
        content: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'colored',
                  marks: [
                    {
                      type: 'textStyle',
                      attrs: { color: '#5dc2da' },
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    })

    const el = wrapper.find('span').element as HTMLElement
    // Check that color style is applied (jsdom may normalize to rgb)
    const styleAttr = el.getAttribute('style') || ''
    expect(styleAttr).toMatch(/color:\s*(#5dc2da|rgb\()/)
  })
})
