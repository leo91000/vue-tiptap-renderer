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

describe('jsonRenderer background color support', () => {
  it('renders text with inline background color from textStyle mark', () => {
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
                  text: 'highlighted',
                  marks: [
                    {
                      type: 'textStyle',
                      attrs: { backgroundColor: '#ffee99' },
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
    const styleAttr = el.getAttribute('style') || ''
    expect(styleAttr).toMatch(/background-color:\s*(#ffee99|rgb\()/)
  })
})
