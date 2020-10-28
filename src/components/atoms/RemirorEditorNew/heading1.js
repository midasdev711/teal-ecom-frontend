import * as React from 'react';
import { setBlockType } from 'prosemirror-commands';
import * as uuid from 'uuid/v4'
import { Extension, blockActive } from 'smartblock';

export default class Heading1 extends Extension {
  constructor(props) {
    super(props);
  }

  get name() {
    return 'heading1';
  }

  get group() {
    return 'block';
  }

  get showMenu() {
    return true;
  }

  get schema() {
    if (this.customSchema) {
      return this.customSchema;
    }
    return {
      content: 'inline*',
      group: 'block',
      defining: true,
      parseDOM: [
        {
          tag: 'h1',
          getAttrs(dom) {
            return {
              id: dom.getAttribute('id') || uuid()
            }
          }
        }
      ],
      attrs: {
        align: { default: '' },
        id: { default: '' }
      },
      toDOM(node) {
        return [
          'h1',
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
    return <img src={'/images/posts/heading.svg'} />
  }

  active(state) {
    return blockActive(state.schema.nodes.heading1)(state);
  }

  enable(state) {
    return setBlockType(state.schema.nodes.heading1)(state);
  }

  onClick(state, dispatch) {
    setBlockType(state.schema.nodes.heading1)(state, dispatch);
  }
}