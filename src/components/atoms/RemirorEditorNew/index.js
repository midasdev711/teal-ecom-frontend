import * as React from 'react';
import 'smartblock/css/smartblock.css';
import Base from './base';
import {
    SmartBlock,
} from 'smartblock';
import Strong from './strong';
import Emphasis from './emphasis';
import Link from './Link';
import Heading1 from './heading1';
import BlockQuote from './blockquote';
import MoveDown from './move-down';
import MoveUp from './move-up';
import Trash from './trash';
import Embed from './Embed';
import Image from './Image';
import Paragraph from './Menu/Paragraph';
import Add from './Menu/add';

const extensions = [
    ...Base,
    new Strong(),
    new Emphasis(),
    new Link(),
    new MoveDown(),
    new MoveUp(),
    new Trash(),
    // new Add(),
    new Paragraph(),
    new Image({}),
    new Embed(),
    new Heading1(),
    new BlockQuote(),
];

export default function Editor({ onChangeEditor, description, flag }) {
    if (!description && flag !== true) {
        return null;
    }
    return (
        <SmartBlock
            extensions={extensions}
            html={description || ""}
            onChange={({ json, html }) => { onChangeEditor(html , json) }}
        />
    )
}