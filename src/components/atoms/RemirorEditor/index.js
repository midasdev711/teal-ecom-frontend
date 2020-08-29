import React from "react";
import { WysiwygEditor } from "@remirror/editor-wysiwyg";

const RemirrorEditor = (props) => {
  return <WysiwygEditor onChange={props.onChangeEditor} />;
};

export default RemirrorEditor;
