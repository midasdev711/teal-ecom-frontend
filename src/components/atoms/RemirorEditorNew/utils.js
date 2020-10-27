import { findChildren } from 'prosemirror-utils';

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