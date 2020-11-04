import * as React from 'react';
import { setTextSelection } from 'prosemirror-utils';
// import MoveDownIcon from '../components/icons/go-down';
import { Extension } from 'smartblock';
import {
    findNodePosition,
} from 'smartblock';
import {
    getRootNodeWithPosByIndex,
    getRootNodeCountFromState,
    getParentNodeIndexFromState
} from './utils';

export default class MoveDown extends Extension {
    get name() {
        return 'move-down';
    }

    get group() {
        return 'edit';
    }

    get showMenu() {
        return true;
    }

    get icon() {
        return <img src={'/images/posts/movedown.svg'} />
    }

    enable(state) {
        const length = getRootNodeCountFromState(state);
        const rowNumber = getParentNodeIndexFromState(state);
        return rowNumber < length - 1;
    }

    onClick(_state, _dispatch, view) {
        const { state } = view;
        const rowNumber = getParentNodeIndexFromState(state);
        const firstNode = getRootNodeWithPosByIndex(state, rowNumber);
        const secondNode = getRootNodeWithPosByIndex(state, rowNumber + 1);
        if (secondNode) {
            const firstIndex = firstNode.pos;
            const secondIndex = secondNode.pos;
            const removeTransaction = state.tr.delete(firstIndex, secondIndex);
            view.dispatch(removeTransaction);
            const firstNode2 = removeTransaction.doc.content.child(rowNumber);
            const firstIndex2 = findNodePosition(removeTransaction.doc, firstNode2);
            const insertTransaction = view.state.tr.insert(
                firstIndex2 + firstNode2.nodeSize,
                firstNode.node
            );
            view.dispatch(insertTransaction);
            view.dispatch(
                setTextSelection(firstIndex2 + firstNode2.nodeSize)(
                    view.state.tr
                ).scrollIntoView()
            );
        }
    }
}