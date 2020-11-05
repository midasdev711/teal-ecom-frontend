import * as React from 'react'
import { toggleMark } from 'prosemirror-commands'
import { Extension } from 'smartblock'
import { markActive } from 'smartblock'

export default class Emphasis extends Extension {
  constructor(props) {
    super(props)
  }

  get name() {
    return 'em';
  }

  get group() {
    return 'mark';
  }

  get showMenu() {
    return true;
  }

  get schema() {
    if (this.customSchema) {
      return this.customSchema;
    }
    return {
      group: 'mark',
      parseDOM: [{ tag: 'em' }, { style: 'font-style=italic' }],
      toDOM: () => [
        'span',
        {
          class: this.className,
          style: 'font-style:italic'
        }
      ]
    }
  }

  get icon() {
    return <img src={'/images/posts/italic.svg'} style={{ width: '5px', height: '15px' }} />
  }

  active(state) {
    return markActive(state.schema.marks.em)(state);
  }

  onClick(state, dispatch) {
    toggleMark(state.schema.marks.em)(state, dispatch);
  }
}