import type { Monaco } from '@monaco-editor/react';
import { Editor } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import { useState } from 'react';

interface ICodeComponentEditorProps {
  value?: string;
  language?: string;
  onChange: (value?: string) => void;
  disableValidation?: boolean;
  options?: editor.IStandaloneEditorConstructionOptions;
}

function CodeComponentEditor(props: ICodeComponentEditorProps) {
  const [monacoInstance, setMonacoInstance] = useState<editor.IStandaloneCodeEditor>();
  const [h, setH] = useState(50);
  const onCodeMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
    if (props.disableValidation) {
      monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: true,
      });
    }

    setMonacoInstance(editor);
  };

  monacoInstance?.onDidContentSizeChange(() => {
    const contentHeight = Math.min(800, monacoInstance.getContentHeight());
    setH(contentHeight);
  });
  return (
    <div
      style={{
        height: h,
      }}
    >
      <Editor // value={code}
        // defaultValue={code}
        theme="vs-dark"
        onMount={onCodeMount}
        value={props.value}
        onChange={(value) => {
          props.onChange(value);
        }}
        options={{
          padding: {
            top: 10,
            bottom: 10,
          },
          automaticLayout: true,
          scrollBeyondLastLine: false,
          ...props.options,
        }}
        language={props.language === 'c++' ? 'c' : props.language}
      />
    </div>
  );
}

export default CodeComponentEditor;
