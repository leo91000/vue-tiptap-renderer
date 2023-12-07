import type { VNode } from 'vue-demi'
import { Text, h } from 'vue-demi'
import type { JSONContent } from '../types'

const { keys, values, entries, assign } = Object

function stylesFromAttrs(attrs?: JSONContent['attrs']) {
  if (!attrs)
    return {}

  const style: Record<string, string> = {}

  for (const [key, value] of entries(attrs)) {
    switch (key) {
      case 'textAlign':
        style.textAlign = value
        break
      case 'fontFamily':
        if (value)
          style.fontFamily = value
        break
    }
  }

  return style
}

function JsonRendererImpl(props: { content: JSONContent }): VNode | VNode[] | null {
  // Render child if any
  const child = props.content
    .content?.map((c) => {
      const result = JsonRendererImpl({ content: c })
      return Array.isArray(result) ? result : [result]
    })
    // Merge all child
    .flat()
    // Remove not rendered
    .filter((v): v is VNode => v !== null)

  let render: VNode

  const style = stylesFromAttrs(props.content.attrs)

  if (props.content.marks) {
    for (const mark of props.content.marks) {
      switch (mark.type) {
        case 'textStyle':
          assign(style, stylesFromAttrs(mark.attrs))
          break
        case 'bold':
          render = h('strong', render || child || props.content.text)
          break
        case 'italic':
          render = h('i', render || child || props.content.text)
          break
        case 'underline':
          render = h('u', render || child || props.content.text)
          break
        case 'strike':
          render = h('s', render || child || props.content.text)
          break
        case 'link':
          render = h('a', { href: mark.attrs.href, target: mark.attrs.target }, render || child || props.content.text)
          break
        default:
          console.warn({
            message: 'Unmanaged mark',
            args: { mark },
          })
      }
    }
  }

  const defaultProps = { style }
  const renderedChild = render || child || props.content.text

  switch (props.content.type) {
    case 'doc':
      return child
    case 'heading':
      return h(`h${props.content.attrs.level}`, defaultProps, renderedChild)
    case 'blockquote':
      return h('blockquote', defaultProps, renderedChild)
    case 'bulletList':
      return h('ul', defaultProps, renderedChild)
    case 'orderedList':
      return h('ol', defaultProps, renderedChild)
    case 'listItem':
      return h('li', defaultProps, renderedChild)
    case 'paragraph':
      return h('p', defaultProps, renderedChild)
    case 'hardBreak':
      return h('br')
    case 'image':
      return h('img', {
        ...defaultProps,
        src: props.content.attrs.src,
        alt: props.content.attrs.alt,
        title: props.content.attrs.title,
      })
    case 'text':
      if (render) {
        render.props = defaultProps
        return render
      }

      if (values(defaultProps).every(value => value instanceof Object ? keys(value).length === 0 : !value))
        return h(Text, props.content.text)

      return h('span', defaultProps, props.content.text)

    default:
      console.warn({
        message: 'Unmanaged render',
        args: {
          type: props.content.type,
        },
      })
      return null
  }
}

export function JsonRenderer(props: { content: JSONContent }): VNode | VNode[] {
  if (!props.content)
    return h('p', {}, 'Cannot render empty article')

  const result = JsonRendererImpl(props)

  if (result === null) {
    console.error({
      message: 'An error occured while rendering content',
    })
    return h('p', {}, 'Cannot render article')
  }

  return result
}
