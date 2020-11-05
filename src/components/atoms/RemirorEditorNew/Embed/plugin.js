import { Plugin } from 'prosemirror-state'
import { setBlockType } from 'prosemirror-commands'
// import prosemirror_utils_1 from "prosemirror-utils";
// import { getParentNodeWithPosFromState } from 'smartblock'
var prosemirror_utils_1 = require("prosemirror-utils");

export var getParentNodeWithPosFromState = function (state) {
  var selection = state.selection;
  var $anchor = selection.$anchor;
  var resolvedPos = state.doc.resolve($anchor.pos);
  var rowNumber = resolvedPos.path[1];
  var i = 0;
  var firstNode = prosemirror_utils_1.findChildren(state.doc, function () {
      if (rowNumber === i) {
          i++;
          return true;
      }
      i++;
      return false;
  }, false)[0];
  return firstNode;
};

export default () => {
  return new Plugin({
    props: {
      handleTextInput(view, _from, _to, text) {
        const { state } = view
        const firstNode = getParentNodeWithPosFromState(state);
        const { node } = firstNode;
        if (node.type.name === 'embed') {
          setBlockType(state.schema.nodes.embed, {
            src: node.textContent + text
          })(state, view.dispatch)
          return false;
        }
        return false;
      }
    }
  })
}
