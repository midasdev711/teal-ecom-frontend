import * as React from 'react';
import dynamic from 'next/dynamic';
import 'smartblock/css/smartblock.css';
import {
    Strong,
    Strike,
    Emphasis,
    Underline,
    Heading1,
    Heading2,
    Heading3,
    ListItem,
    BulletList,
    OrderedList,
    Blockquote,
    Embed,
    Table,
    Image,
    Code,
} from 'smartblock';
import Base from 'smartblock/lib/extensions/base';
import { SmartBlock , Extensions} from 'smartblock';

const extensions = [
    ...Base,
    new Strong(),
    new Underline(),
    new Strike(),
    new Emphasis(),
    new Heading1(),
    new Heading2(),
    new Heading3(),
    new ListItem(),
    new BulletList(),
    new OrderedList(),
    new Blockquote(),
    new Embed(),
    new Table(),
    new Image({}),
    new Code()
]

export default function Editor({ onChangeEditor, description , flag }) {
    if(!description && flag !== true) {
        return null;
    }
    return (
        <SmartBlock
            extensions={extensions}
            html={description || ""}
            onChange={({ json, html }) => {onChangeEditor(html)}}
        />
    )
}