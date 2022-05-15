import { describe, expect, it } from 'vitest'
import { getContentFirstImage, getContentWordCount } from '../src'

describe('utils', () => {
  describe('getContentFirstImage', () => {
    it('should not return any image if the content does not include image', () => {
      expect(
        getContentFirstImage({
          type: 'doc',
          content: [
            {
              type: 'text',
              text: 'This is a sample article',
            },
          ],
        }),
      ).toBeNull()
    })

    it('should return the image if one image is present', () => {
      expect(
        getContentFirstImage({
          type: 'doc',
          content: [
            {
              type: 'text',
              text: 'This is a sample article',
            },
            {
              type: 'image',
              attrs: {
                src: 'https://domain.com/my-image.jpg',
                alt: 'A sample image for my sample article',
                title: 'A sample title',
              },
            },
          ],
        }),
      ).toEqual({
        src: 'https://domain.com/my-image.jpg',
        alt: 'A sample image for my sample article',
        title: 'A sample title',
      })
    })

    it ('should return the first image if multiple image are present', () => {
      expect(
        getContentFirstImage({
          type: 'doc',
          content: [
            {
              type: 'text',
              text: 'This is a sample article',
            },
            {
              type: 'image',
              attrs: {
                src: 'https://domain.com/my-image.jpg',
                alt: 'A sample image for my sample article',
                title: 'A sample title',
              },
            },
            {
              type: 'image',
              attrs: {
                src: 'https://domain.com/another-image.jpg',
                alt: 'Another sample image for my sample article',
                title: 'Another sample title',
              },
            },
          ],
        }),
      ).toEqual({
        src: 'https://domain.com/my-image.jpg',
        alt: 'A sample image for my sample article',
        title: 'A sample title',
      })
    })
  })

  describe('getContentWordCount', () => {
    it('should return 0 if there is not any word', () => {
      expect(
        getContentWordCount({
          type: 'doc',
          content: [
            {
              type: 'text',
              text: '',
            },
          ],
        }),
      ).toEqual(0)
    })

    it('should return the word count', () => {
      expect(
        getContentWordCount({
          type: 'doc',
          content: [
            {
              type: 'heading',
              content: [
                { type: 'text', text: 'My Title is cool' },
              ],
            },
            {
              type: 'paragraph',
              content: [
                { type: 'text', text: 'My Paragraph is also cool' },
              ],
            },
          ],
        }),
      ).toEqual(9)
    })
  })
})
