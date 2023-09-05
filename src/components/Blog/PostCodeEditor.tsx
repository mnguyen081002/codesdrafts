import { Select } from '@mantine/core';
import { useMonaco } from '@monaco-editor/react';
import { useState } from 'react';

import type { BlogComponentProps, PostCodeContent } from '../../shared/interface';
import { capitalizeFirstLetter, lowerCaseFirstLetter } from '../../utils/app';
import CodeComponentEditor from '../Lesson/CodeEditorComponent';

interface IPostCodeEditorProps {
  reference: React.MutableRefObject<BlogComponentProps<PostCodeContent>>;
  isReadOnly?: boolean;
}

const PostCodeEditor = (props: IPostCodeEditorProps) => {
  const monaco = useMonaco();

  const languages =
    monaco?.languages.getLanguages().map((language) => capitalizeFirstLetter(language.id) || '') ||
    [];
  const [language, setLanguage] = useState<string>(
    props.reference.current.content.language || 'plaintext',
  );

  return (
    <div className="flex flex-col overflow-hidden rounded-md border border-light-border">
      {!props.isReadOnly && (
        <div className="flex max-w-[400px] items-center gap-3 p-2">
          <p>Ngôn ngữ:</p>
          <Select
            data={languages}
            limit={languages.length}
            onChange={(v) => {
              setLanguage(lowerCaseFirstLetter(v || 'plaintext'));
            }}
            defaultValue={'Plaintext'}
          />
        </div>
      )}
      <CodeComponentEditor
        options={{
          lineNumbers: 'off',
          minimap: { enabled: false },
          readOnly: props.isReadOnly,
          renderLineHighlight: 'none',
          fontSize: 18,
        }}
        onChange={(value) => {
          if (!props.reference.current) return;
          props.reference.current.content.code = value || '';
        }}
        disableValidation
        language={language}
        value={props.reference.current.content.code}
      />
    </div>
  );
};
export default PostCodeEditor;
