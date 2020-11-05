import { findChildren } from 'prosemirror-utils';
import { getParentNodeWithPosFromState } from 'smartblock'

export const getRootNodeWithPosByIndex = (
    state,
    index
) => {
    let i = 0
    const [firstNode] = findChildren(
        state.doc,
        () => {
            if (i === index) {
                i++
                return true
            }
            i++
            return false
        },
        false
    );
    return firstNode;
}

export const getRootNodeCountFromState = (state) => {
    return state.doc.content.childCount;
}

export const getParentNodeIndexFromState = (state) => {
    const { selection } = state;
    const { $anchor } = selection;
    const resolvedPos = state.doc.resolve($anchor.pos);
    const rowNumber = resolvedPos.path[1];
    return rowNumber;
}

export const getMarkInSelection = (markName, state) => {
    const { selection } = state;
    const { $anchor } = selection;
    const { nodeAfter } = $anchor;
    if (nodeAfter) {
        return nodeAfter.marks.find(mark => {
            if (mark.type.name === markName) {
                return true;
            }
        })
    }
    return null;
}

export const getScrollTop = () => {
    return (
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0
    );
}

export const getParentNodeFromState = (state) => {
    const firstNode = getParentNodeWithPosFromState(state);
    const { node } = firstNode;
    return node;
}