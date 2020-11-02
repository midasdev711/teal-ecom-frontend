import * as React from 'react';
import 'smartblock/css/smartblock.css';
import {
    SmartBlock,
    Extensions
} from 'smartblock';

export default function Editor({ onChangeEditor, description, flag }) {
    if (!description && flag !== true) {
        return null;
    }
    return (
        <SmartBlock
            extensions={Extensions}
            html={description || ""}
            onChange={({ json, html }) => { onChangeEditor(html, json) }}
        />
    )
}