import * as React from 'react';
import dynamic from 'next/dynamic';
import 'smartblock/css/smartblock.css';
// import { SmartBlock , Extensions} from 'smartblock';
const SmartBlock = dynamic(() => import('smartblock').then(mod => mod.SmartBlock), { ssr: false });
const Extensions = dynamic(() => import('smartblock').then(mod => mod.Extensions), { ssr: false });


export default function Editor() {
    return (
        <SmartBlock
            extension={Extensions}
            html={'<h2>Hello World</h2><p>hello</p>'}
            onChange={({ json, html }) => { console.log(json, html); }}
        />
    )
}