import type { InjectionKey, VNode } from 'vue-demi'
import { h, inject } from 'vue-demi'
import type { JSONContent, LinkAttrs } from '../types'

const { keys } = Object

const textAlignClasses = {
  center: 'text-center',
  justify: 'text-justify',
  left: 'text-left',
  right: 'text-right',
}

export type FontFamilyClasses = Record<string, string>

function classesFromAttrs(attrs?: JSONContent['attrs'], fontFamilyClasses?: FontFamilyClasses) {
  if (!attrs)
    return []

  const classes = []

  for (const key in attrs) {
    switch (key) {
      case 'textAlign':
        if (textAlignClasses[attrs.textAlign])
          classes.push(textAlignClasses[attrs.textAlign])
        break
      case 'fontFamily':
        if (fontFamilyClasses?.[attrs.fontFamily])
          classes.push(fontFamilyClasses[attrs.fontFamily])

        break
    }
  }

  return classes
}

function classesFromMarks(marks?: JSONContent['marks'], fontFamilyClasses?: FontFamilyClasses) {
  if (!marks)
    return []

  const classes = []

  for (const mark of marks) {
    switch (mark.type) {
      case 'textStyle':
        classes.push(...classesFromAttrs(mark.attrs, fontFamilyClasses))
        break
      case 'bold':
        classes.push('font-bold')
        break
      case 'italic':
        classes.push('italic')
        break
      case 'underline':
        classes.push('underline')
        break
      case 'strike':
        classes.push('line-through')
        break
      case 'link':
        break
      default:
        console.warn({
          message: 'Unmanaged mark',
          args: { mark },
        })
    }
  }

  return classes
}

function findRootLinks(content: JSONContent) {
  return content?.marks?.find(value => value.type === 'link')
}

function childWithText(text: string | VNode, child?: VNode[] | undefined, link?: LinkAttrs) {
  let actualText = text
  if (link)
    actualText = h('a', { href: link.href, target: link.target }, text)

  return child && child.length ? [actualText, ...child] : actualText
}

function text(content: JSONContent, child?: VNode[] | undefined) {
  return childWithText(content.text, child, findRootLinks(content)?.attrs as LinkAttrs | undefined)
}

function JsonRendererImpl(props: { content: JSONContent; fontFamilyClasses?: FontFamilyClasses }): VNode | VNode[] | null {
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

  const classes = [...classesFromAttrs(props.content.attrs, props.fontFamilyClasses), ...classesFromMarks(props.content.marks)]

  const defaultProps = {
    class: classes,
  }

  switch (props.content.type) {
    case 'doc':
      return child
    case 'heading':
      return h(`h${props.content.attrs.level}`, defaultProps, child)
    case 'blockquote':
      return h('blockquote', defaultProps, child)
    case 'bulletList':
      return h('ul', defaultProps, child)
    case 'orderedList':
      return h('ol', defaultProps, child)
    case 'listItem':
      return h('li', defaultProps, child)
    case 'text':
      return h('span', defaultProps, text(props.content, child))
    case 'paragraph':
      return h('p', defaultProps, text(props.content, child))
    case 'hardBreak':
      return h('br')
    case 'image':
      return h('img', {
        ...defaultProps,
        src: props.content.attrs.src,
        alt: props.content.attrs.alt,
        title: props.content.attrs.title,
      })
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

export const FontFamilyClassesKey: InjectionKey<FontFamilyClasses> = Symbol('VueTiptapRendererFontFamilyClasses')

export function JsonRenderer({ content, fontFamilyClasses = inject(FontFamilyClassesKey, undefined) }: { content: JSONContent; fontFamilyClasses?: FontFamilyClasses }): VNode | VNode[] {
  if (!content)
    return h('p', {}, 'Cannot render article')

  // Automatically quote the font families
  if (fontFamilyClasses) {
    for (const key of keys(fontFamilyClasses)) {
      const escaped = key
        .replaceAll(/(^['"]+)|(['"]+$)/g, '')
        .replaceAll('\'', '\\\'')
        .replaceAll('"', '\\"')

      fontFamilyClasses[`'${escaped}'`] = fontFamilyClasses[key]
      fontFamilyClasses[`"${escaped}"`] = fontFamilyClasses[key]
    }
  }

  const result = JsonRendererImpl({ content, fontFamilyClasses })

  if (result === null) {
    console.error({
      message: 'An error occured while rendering content',
    })
    return h('p', {}, 'Cannot render article')
  }

  return result
}

