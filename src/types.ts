export interface JSONContent {
  type?: string
  attrs?: Record<string, any>
  content?: JSONContent[]
  marks?: {
    type: string
    attrs?: Record<string, any>
    [key: string]: any
  }[]
  text?: string

  [key: string]: any
}

export interface LinkAttrs {
  href: string
  target?: string
}
