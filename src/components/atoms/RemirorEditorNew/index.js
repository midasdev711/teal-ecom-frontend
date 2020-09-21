import React, { useState, useEffect } from "react";
import { BoldExtension } from "@remirror/extension-bold";
import { ItalicExtension } from "remirror/extension/italic";
import { ReactSsrExtension } from "remirror/extension/react-ssr";
 import { fromHtml } from 'remirror/core';
import { RemirrorProvider, useManager, useRemirror } from "remirror/react";

const EXTENSIONS = () => [
  new ReactSsrExtension(),
  new BoldExtension(),
  new ItalicExtension(),
];

/**
 * This component contains the editor and any toolbars/chrome it requires.
 */
const SmallEditor = () => {

  const { getRootProps, commands } = useRemirror();

  return (
    <div>
      <button onClick={() => commands.toggleBold()}>bold</button>
      <button onClick={() => commands.toggleItalic()}>italic</button>
      <div {...getRootProps()} />
    </div>
  );
};


const SmallEditorContainer = ({ onChangeEditor, description }) => {
  const extensionManager = useManager(EXTENSIONS);
  // Store the editor value in a state variable.
  const [value, setValue] = useState(() =>
    // Use the `remirror` manager to create the state.
    extensionManager.createState({
      content: '<p>start typing</p>',
      stringHandler: fromHtml,
    }),
  );

  useEffect(() => {
    if (description) {
      const nextState = extensionManager.createState({
        content: description,
        stringHandler: fromHtml,
      });
      // console.log('nextState', nextState);
      setValue(nextState);
    }
  }, [description])

  return (
    <RemirrorProvider
      manager={extensionManager}
      value={value}
      onChange={(parameter) => {
        // Update the state to the latest value.
        // console.log('parameter', parameter);
        setValue(parameter.state);
        onChangeEditor(parameter)
      }}
    >
      <SmallEditor />
    </RemirrorProvider>
  );
};

export default SmallEditorContainer;
