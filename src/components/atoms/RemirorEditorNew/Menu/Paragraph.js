import * as React from 'react'
import { setBlockType } from 'prosemirror-commands'
import * as uuid from 'uuid/v4'
import { Extension } from 'smartblock'
import { blockActive } from 'smartblock'

export default class Paragraph extends Extension {
  constructor(props) {
    super(props);
  }

  get name() {
    return 'paragraph';
  }

  get group() {
    return 'block';
  }

  get showMenu() {
    return false;
  }

  get schema() {
    if (this.customSchema) {
      return this.customSchema;
    }
    return {
      content: 'inline*',
      group: 'block',
      parseDOM: [
        {
          tag: 'p',
          getAttrs(dom) {
            return {
              id: dom.getAttribute('id') || uuid(),
              align: dom.style.textAlign
            }
          }
        }
      ],
      attrs: {
        align: { default: '' },
        id: { default: '' }
      },
      toDOM: node => {
        return [
          'p',
          (node.attrs.align ? {
            style: `text-align: ${node.attrs.align}`,
            class: this.className
          } : {
            class: this.className
          }),
          0
        ]
      }
    }
  }

  get icon() {
    return <img src={'/images/posts/remove.svg'} />
  }

  active(state) {
    return blockActive(state.schema.nodes.paragraph)(state);
  }

  enable(state) {
    return setBlockType(state.schema.nodes.paragraph)(state);
  }

  onClick(state, dispatch) {
    setBlockType(state.schema.nodes.paragraph)(state, dispatch);
  }
}