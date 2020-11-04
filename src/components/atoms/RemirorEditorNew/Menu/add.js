import * as React from 'react'
import { setBlockType } from 'prosemirror-commands'
import * as uuid from 'uuid/v4'
import { Extension } from 'smartblock'
import { blockActive } from 'smartblock'

export default class Add extends Extension {
  constructor(props) {
    super(props);
  }

  get name() {
    return 'add';
  }

  get group() {
    return 'block';
  }

  get showMenu() {
    return true;
  }

//   get schema() {
//     if (this.customSchema) {
//       return this.customSchema;
//     }
//     return {
//         content: 'inline*',
//         group: 'block',
//       parseDOM: [{ tag: 'em' }, { style: 'font-style=italic' }],
//       toDOM: () => [
//         'span',
//         {
//           class: this.className,
//           style: 'font-style:italic'
//         }
//       ]
//     }
//   }

  get icon() {
    return <img src={'/images/posts/new.svg'} />
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