import * as React from 'react';
import 'smartblock/css/smartblock.css';
import Base from 'smartblock/lib/extensions/base';
import { 
  SmartBlock, Image, Heading1,Heading2, Heading3, BulletList,ListItem,OrderedList, Blockquote, Embed, Table,Code,Strong, Emphasis, Underline, Strike, Link,} from 'smartblock';
import { apolloClient } from '../../../graphql';
import { SET_IMAGE_EXTENSION_MUTATION } from '../../../graphql/articles.query';

const extensions = [
    ...Base,
    new Heading1(),
    new Heading2(),
    new Heading3(),
    new BulletList(),
    new ListItem(),
    new OrderedList(),
    new Blockquote(),
    new Embed(), 
    new  Table(),
    new Code(),
    new Strong(),
    new Emphasis(),
    new Underline(),  
    new Strike(),
    new Link(),
    new Image({
      onChange: async (preview, file) => {
        try {
          const res = await apolloClient
          .mutate({
            mutation: SET_IMAGE_EXTENSION_MUTATION,
            variables:{
                articleImage:file
              },
          });
          const result = (res.data && res.data.uploadArticleImg && res.data.uploadArticleImg.imgUrl || null);
          return result;
        } catch (error) {
          console.log('error', error);
            return null;
        }
      }
    })
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