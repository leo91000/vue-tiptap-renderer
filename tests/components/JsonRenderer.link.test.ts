import type { JSONContent } from '../../src'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { JsonRenderer } from '../../src'

function renderLink(marks: JSONContent['marks']) {
  return mount(JsonRenderer, {
    props: { content: { type: 'text', text: 'Visit Eliah', marks } },
  })
}

const link = { type: 'link', attrs: { href: 'https://eliah.fr', target: '_blank' } }

describe('jsonRenderer links', () => {
  it('preserves link attributes on text nodes', () => {
    const wrapper = renderLink([link])

    expect(wrapper.get('a').attributes()).toMatchObject({
      href: 'https://eliah.fr',
      target: '_blank',
      rel: 'noopener noreferrer',
    })
    expect(wrapper.text()).toBe('Visit Eliah')
  })

  it.each([undefined, null, ''])('defaults an empty rel (%s)', (rel) => {
    const wrapper = renderLink([{ ...link, attrs: { ...link.attrs, rel } }])
    expect(wrapper.get('a').attributes('rel')).toBe('noopener noreferrer')
  })

  it('preserves an explicit rel', () => {
    const wrapper = renderLink([{ ...link, attrs: { ...link.attrs, rel: 'nofollow author' } }])
    expect(wrapper.get('a').attributes('rel')).toBe('nofollow author')
  })

  it.each([
    [link, { type: 'bold' }],
    [{ type: 'bold' }, link],
  ])('preserves links with nested marks: %j', (...marks) => {
    const wrapper = renderLink(marks)
    expect(wrapper.get('a').attributes('href')).toBe('https://eliah.fr')
    expect(wrapper.get('a').attributes('target')).toBe('_blank')
    expect(wrapper.get('strong').text()).toBe('Visit Eliah')
  })

  it('merges text styles without losing link attributes', () => {
    const wrapper = renderLink([
      link,
      { type: 'textStyle', attrs: { color: 'red', backgroundColor: 'yellow', fontFamily: 'serif' } },
    ])
    const anchor = wrapper.get('a')
    expect(anchor.attributes('href')).toBe('https://eliah.fr')
    expect(anchor.element.style.color).toBe('red')
    expect(anchor.element.style.backgroundColor).toBe('yellow')
    expect(anchor.element.style.fontFamily).toBe('serif')
  })
})
