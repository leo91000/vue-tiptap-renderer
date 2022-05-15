import type { JSONContent } from './types'

export function getContentFirstImage(content: JSONContent): { src: string; alt: string; title: string } | null {
  if (content.type === 'image') {
    return {
      src: content.attrs.src,
      alt: content.attrs.alt,
      title: content.attrs.title,
    }
  }

  if (content.content) {
    for (const child of content.content) {
      const firstImage = getContentFirstImage(child)
      if (firstImage)
        return firstImage
    }
  }

  return null
}

export function getContentWordCount(content: JSONContent): number {
  let wordCount = 0

  if (!content)
    return wordCount

  if (content.content) {
    for (const child of content.content)
      wordCount += getContentWordCount(child)
  }

  if (content.text)
    wordCount += content.text.split(' ').length

  return wordCount
}
