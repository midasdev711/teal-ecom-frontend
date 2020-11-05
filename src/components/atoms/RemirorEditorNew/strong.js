import * as React from 'react'
import { toggleMark } from 'prosemirror-commands'
import { Extension } from 'smartblock'
import { markActive } from 'smartblock'

export default class Strong extends Extension {
  constructor(props) {
    super(props);
  }

  get name() {
    return 'strong';
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
      parseDOM: [{ tag: 'strong' }, { style: 'font-weight=bold' }],
      toDOM: () => [
        'strong',
        {
          style: 'font-weight:bold'
        }
      ]
    }
  }

  get icon() {
    return <img src={'/images/posts/bold.svg'} style={{ width: '12px', height: '15px' }} />
  }

  active(state) {
    return markActive(state.schema.marks.strong)(state);
  }

  onClick(state, dispatch) {
    toggleMark(state.schema.marks.strong)(state, dispatch);
  }
}