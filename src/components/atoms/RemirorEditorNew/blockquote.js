import * as React from 'react'
import { setBlockType, toggleMark } from 'prosemirror-commands'
import * as uuid from 'uuid/v4'
import { Extension } from 'smartblock'
import { markActive, blockActive } from 'smartblock'

export default class BlockQuote extends Extension {
  constructor(props) {
    super(props);
  }

  get name() {
    return 'blockquote';
  }

  get group() {
    return 'block';
  }

  get showMenu() {
    return true;
  }

  get schema() {
    if (this.customSchema) {
      return this.customSchema
    }
    return {
      content: 'inline*',
      group: 'block',
      parseDOM: [
        {
          tag: 'blockquote',
          getAttrs(dom) {
            return {
              id: dom.getAttribute('id') || uuid()
            }
          }
        }
      ],
      attrs: {
        align: { default: 'left' },
        id: { default: '' }
      },
      toDOM: node => {
        return [
          'blockquote',
          {
            class: this.className
          },
          0
        ]
      }
    }
  }

  get icon() {
    return <img src={'/images/posts/blockquote.svg'} />
  }

  active(state) {
    return blockActive(state.schema.nodes.blockquote)(state);
  }

  enable(state) {
    return setBlockType(state.schema.nodes.blockquote)(state);
  }

  onClick(state, dispatch) {
    setBlockType(state.schema.nodes.blockquote)(state, dispatch);
  }
}