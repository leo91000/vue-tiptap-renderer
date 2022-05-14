import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import type { FontFamilyClasses } from '../../src'
import { JsonRenderer } from '../../src'
import type { JSONContent } from '../../dist'

const WrappedJsonRenderer = defineComponent({
  components: {
    JsonRenderer,
  },
  props: {
    content: {
      type: Object as () => JSONContent,
      required: true,
    },
    fontFamilyClasses: {
      type: Object as () => FontFamilyClasses,
      default: undefined,
    },
  },
  template: '<JsonRenderer v-bind="$props" />',
})

describe('JsonRenderer', () => {
  it('should render text', () => {
    const wrapper = mount(WrappedJsonRenderer, {
      props: {
        content: {
          type: 'doc',
          content: [{ type: 'text', text: 'ARTICLE_RENDERED_SUCCESFULLY' }],
        },
      },
    })

    expect(wrapper.html()).toContain('ARTICLE_RENDERED_SUCCESFULLY')
  })

  it('should render complex articles', () => {
    const wrapper = mount(WrappedJsonRenderer, {
      props: {
        content: { type: 'doc', content: [{ type: 'paragraph', attrs: { textAlign: 'left' } }, { type: 'image', attrs: { alt: 'Sans titre.jpg', src: 'https://aqhptogkwxnadanqnhgi.supabase.co/storage/v1/object/public/storage/20220501165812941_Sans titre.jpg', title: 'Sans titre.jpg' } }, { type: 'paragraph', attrs: { textAlign: 'left' }, content: [{ text: ' ', type: 'text', marks: [{ type: 'bold' }, { type: 'textStyle', attrs: { fontFamily: '' } }] }] }, { type: 'paragraph', attrs: { textAlign: 'justify' }, content: [{ text: 'Être aimé, est à l’enfance une question de survie. Les yeux et oreilles rivés vers l’extérieur, vous entendez les injonctions et expressions d’autrui. D’abord vous écoutez, et puis vous vous adaptez.', type: 'text', marks: [{ type: 'textStyle', attrs: { fontFamily: 'Calibri, sans-serif' } }] }] }, { type: 'paragraph', attrs: { textAlign: 'justify' }, content: [{ type: 'hardBreak', marks: [{ type: 'textStyle', attrs: { fontFamily: 'Calibri, sans-serif' } }] }, { text: 'Ce besoin indispensable d’être aimé peut pourtant devenir la source de problèmes aussi communs qu’importants. Car même s’il est temporaire, le conditionnement reste. Dans ce cas, votre attention est focalisée vers les autres. Vous êtes donc alerte aux choses du monde (les pensées probables d’autrui, ce qu’il est préférable de faire ou non…) : adepte du compromis et de la comparaison. Et souvent, c’est inconscient. Il est possible que vous agissiez en considérant l’extérieur en premier. Cette course à la vie, à la survie parfois, peut vous faire oublier l’essentiel : ', type: 'text', marks: [{ type: 'textStyle', attrs: { fontFamily: 'Calibri, sans-serif' } }] }, { text: 'et moi ? ', type: 'text', marks: [{ type: 'bold' }, { type: 'italic' }, { type: 'textStyle', attrs: { fontFamily: 'Calibri, sans-serif' } }] }, { text: 'Car la responsabilité des actes envers Soi existe et devrait compter autant que celle des actes envers l’Extérieur ', type: 'text', marks: [{ type: 'textStyle', attrs: { fontFamily: 'Calibri, sans-serif' } }] }] }, { type: 'paragraph', attrs: { textAlign: 'justify' }, content: [{ type: 'hardBreak', marks: [{ type: 'textStyle', attrs: { fontFamily: 'Calibri, sans-serif' } }] }, { text: 'RENTRER EN RELATION AVEC SOI MÊME ', type: 'text', marks: [{ type: 'bold' }, { type: 'textStyle', attrs: { fontFamily: 'Calibri, sans-serif' } }] }, { type: 'hardBreak', marks: [{ type: 'bold' }, { type: 'textStyle', attrs: { fontFamily: 'Calibri, sans-serif' } }] }, { text: 'C’est incontournable, pour commencer à s’aimer d’avantage il faut ', type: 'text', marks: [{ type: 'textStyle', attrs: { fontFamily: 'Calibri, sans-serif' } }] }, { text: 'le décider', type: 'text', marks: [{ type: 'bold' }, { type: 'textStyle', attrs: { fontFamily: 'Calibri, sans-serif' } }] }, { text: '. C’est-à-dire, décider que vous serez la première personne sur qui vous pouvez compter. Créez un espace intérieur pour vous soucier de vous. Encouragez-vous, aidez-vous.', type: 'text', marks: [{ type: 'textStyle', attrs: { fontFamily: 'Calibri, sans-serif' } }] }, { type: 'hardBreak', marks: [{ type: 'textStyle', attrs: { fontFamily: 'Calibri, sans-serif' } }] }, { text: 'Évaluer l’état de cette relation à vous-même, peut être un vrai plus. Comment est-ce je me parle et me vois ?', type: 'text', marks: [{ type: 'textStyle', attrs: { fontFamily: 'Calibri, sans-serif' } }] }] }, { type: 'paragraph', attrs: { textAlign: 'justify' }, content: [{ text: ' ', type: 'text', marks: [{ type: 'textStyle', attrs: { fontFamily: 'Calibri, sans-serif' } }] }, { type: 'hardBreak', marks: [{ type: 'textStyle', attrs: { fontFamily: 'Calibri, sans-serif' } }] }, { text: 'CONSCIENT DE SES MOTIVATIONS', type: 'text', marks: [{ type: 'bold' }, { type: 'textStyle', attrs: { fontFamily: 'Calibri, sans-serif' } }] }, { type: 'hardBreak', marks: [{ type: 'textStyle', attrs: { fontFamily: 'Calibri, sans-serif' } }] }, { text: 'Nos actions ont parfois un rapport avec soi. Par exemple ; j’apporte un café à une collègue pour lui faire plaisir. Il est vrai que je lui apporte ce sentiment. Mais je le fais aussi parce que ça me procure de la joie. Prendre conscience que vous êtes deux à bénéficier de cet acte, vous feras toucher du doigt ce que peut être un acte d’amour envers soi. ', type: 'text', marks: [{ type: 'textStyle', attrs: { fontFamily: 'Calibri, sans-serif' } }] }] }, { type: 'paragraph', attrs: { textAlign: 'justify' }, content: [{ type: 'hardBreak', marks: [{ type: 'textStyle', attrs: { fontFamily: 'Calibri, sans-serif' } }] }, { text: 'DES PETITS MOMENTS', type: 'text', marks: [{ type: 'bold' }, { type: 'textStyle', attrs: { fontFamily: 'Calibri, sans-serif' } }] }, { type: 'hardBreak', marks: [{ type: 'textStyle', attrs: { fontFamily: 'Calibri, sans-serif' } }] }, { text: 'Un petit tête-à-tête ? Oui, mais avec vous-même de temps en temps : c’est mieux ! Prenez ces petits moments, écrivez dans un journal ou juste pensez, accordez-vous un moment pour vous exprimer entre vous et vous. Et faite des pauses, prenez tout simplement des moments pour vous faire plaisir.', type: 'text', marks: [{ type: 'textStyle', attrs: { fontFamily: 'Calibri, sans-serif' } }] }] }, { type: 'paragraph', attrs: { textAlign: 'justify' }, content: [{ type: 'hardBreak', marks: [{ type: 'textStyle', attrs: { fontFamily: 'Calibri, sans-serif' } }] }, { text: 'ACCUEILLEZ VOS PROPRES ÉMOTIONS', type: 'text', marks: [{ type: 'bold' }, { type: 'textStyle', attrs: { fontFamily: 'Calibri, sans-serif' } }] }, { text: ' ', type: 'text', marks: [{ type: 'textStyle', attrs: { fontFamily: 'Calibri, sans-serif' } }] }, { type: 'hardBreak', marks: [{ type: 'textStyle', attrs: { fontFamily: 'Calibri, sans-serif' } }] }, { text: 'Comment ça va moi ? Qu’est que je ressens ? Les défis et les événements du quotidien créent des réactions intérieures. Parfois pour des sujets qui paraissent anodins. Vous n’êtes pas obligé d’attendre l’aide de quelqu’un pour vous exprimer. Vous avez le droit de cogner dans un coussin ou de pleurer quand cela est bon ! Relâcher l’émotion peut amener à la compréhension de quelque chose qui se joue en vous. Cette habitude peut aussi améliorer vos relations, en vous évitant d’avantage d’exploser ou de projeter sur les autres. ', type: 'text', marks: [{ type: 'textStyle', attrs: { fontFamily: 'Calibri, sans-serif' } }] }] }, { type: 'paragraph', attrs: { textAlign: 'justify' }, content: [{ type: 'hardBreak', marks: [{ type: 'textStyle', attrs: { fontFamily: 'Calibri, sans-serif' } }] }, { text: 'DÉCIDEZ POUR VOUS', type: 'text', marks: [{ type: 'bold' }, { type: 'textStyle', attrs: { fontFamily: 'Calibri, sans-serif' } }] }, { type: 'hardBreak', marks: [{ type: 'bold' }, { type: 'textStyle', attrs: { fontFamily: 'Calibri, sans-serif' } }] }, { text: 'Ne laissez pas les autres décider pour vous. À la fin, c’est vous qui avez le dernier mot sur ce à quoi doit ressembler votre vie ou votre quotidien. Soyez conscient de votre part de responsabilité dans la vie que vous vivez. Attention responsabilité ne veut pas dire culpabilité. ', type: 'text', marks: [{ type: 'textStyle', attrs: { fontFamily: 'Calibri, sans-serif' } }] }] }, { type: 'paragraph', attrs: { textAlign: 'justify' }, content: [{ type: 'hardBreak', marks: [{ type: 'textStyle', attrs: { fontFamily: 'Calibri, sans-serif' } }] }, { text: 'PARDONNEZ-VOUS LES « FAUSSES ROUTES »', type: 'text', marks: [{ type: 'bold' }, { type: 'textStyle', attrs: { fontFamily: 'Calibri, sans-serif' } }] }, { type: 'hardBreak', marks: [{ type: 'textStyle', attrs: { fontFamily: 'Calibri, sans-serif' } }] }, { text: '« Avec la culpabilité, le malheur est la chose la plus démocratique du monde. On y a tous droit à un moment ou un autre », Eric Neuhoff.', type: 'text', marks: [{ type: 'textStyle', attrs: { fontFamily: 'Calibri, sans-serif' } }] }, { type: 'hardBreak', marks: [{ type: 'textStyle', attrs: { fontFamily: 'Calibri, sans-serif' } }] }, { text: 'Nourrir un sentiment négatif à votre égard favorisera comme cela le ferait avec une personne extérieure, un éloignement. Il peut devenir la cause de nombreux maux du quotidien. Si vos sentiments ètaient une valise, la culpabilité peut y être l’objet le plus lourd. Cette valise si lourde, vous permettra elle de voyager à votre guise ?', type: 'text', marks: [{ type: 'textStyle', attrs: { fontFamily: 'Calibri, sans-serif' } }] }] }, { type: 'paragraph', attrs: { textAlign: 'justify' }, content: [{ type: 'hardBreak', marks: [{ type: 'textStyle', attrs: { fontFamily: 'Calibri, sans-serif' } }] }, { text: 'STOP A LA COMPARAISON', type: 'text', marks: [{ type: 'bold' }, { type: 'textStyle', attrs: { fontFamily: 'Calibri, sans-serif' } }] }, { type: 'hardBreak', marks: [{ type: 'textStyle', attrs: { fontFamily: 'Calibri, sans-serif' } }] }, { text: 'Ne vous focalisez pas sur ce que l’autre a et que vous n’avez pas. Cela peut valider et nourrir l’idée que vous avez de ne pas être pas à la hauteur ou que vous êtes moins bien, etc. Partez à la découverte de ce qui est beau chez vous, de vos qualités, de vos talents, de vos chances…', type: 'text', marks: [{ type: 'textStyle', attrs: { fontFamily: 'Calibri, sans-serif' } }] }, { type: 'hardBreak', marks: [{ type: 'textStyle', attrs: { fontFamily: 'Calibri, sans-serif' } }] }] }] },
        fontFamilyClasses: {
          'Anantha Signature': 'font-anantha',
          'Gravity': 'font-gravity',
          'Champagne & Limousines': 'font-champagne',
          'Calibri, sans-serif': 'font-sans',
        },
      },
    })

    expect(
      wrapper.html(),
    ).toMatchSnapshot()
  })
})
