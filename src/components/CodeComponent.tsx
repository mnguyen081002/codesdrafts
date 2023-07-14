import { useClickOutside } from '@mantine/hooks';
import Editor from '@monaco-editor/react';
import { random } from 'lodash';
import type { editor } from 'monaco-editor';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { useState } from 'react';

import type { ExecuteResponse } from '../api/codesmooth-api';
import { ComponentType } from '../shared/enum/component';
import type { ICodeComponentPropsV2 } from '../shared/interface';
import { BaseComponentV2 } from './BaseComponent';
import { PrimaryButton } from './Button';
import CodeComponentEditor from './Lesson/CodeEditorComponent';
import CodeToolbar from './Lesson/CodeToolbar';
import CreateTestCaseComponent from './Lesson/CreateTestCase';
import { ResultTable } from './Lesson/ResultTable';

export const CodeComponent: FC<ICodeComponentPropsV2> = (params) => {
  const [executeRes, setExecuteRes] = useState<ExecuteResponse>();
  useState<editor.IStandaloneCodeEditor | null>(null);
  const [isWaitingExecute, setIsWaitingExecute] = useState(false);
  const [isSample, setIsSample] = useState(false);

  params.reference.current =
    params.reference.current.type === ComponentType.Code
      ? params.reference.current
      : {
          type: ComponentType.Code,
          content: {
            isReadOnly: false,
            isExercise: false,
            allowDownload: false,
            language: 'typescript',
            code: '',
            judgeContent: {
              executeCode: '',
              testCode: '',
            },
            runable: false,
            timeLimit: 0,
          },
        };

  const { isExercise, runable } = params.reference.current.content;
  const { executeCode } = params.reference.current.content.judgeContent;
  const { testCode } = params.reference.current.content.judgeContent;
  const { code } = params.reference.current.content;
  const [language, setLanguage] = useState(params.reference.current.content.language);
  const [_, rerender] = useState(0);

  const options: editor.IStandaloneEditorConstructionOptions = {
    selectionHighlight: false,
    lineNumbers: 'on',
    readOnly: !params.reference.current.content.isExercise,
    domReadOnly: !params.reference.current.content.isExercise,
    renderLineHighlight: 'none',
    cursorStyle: 'line',
    minimap: {
      enabled: false,
    },
    scrollBeyondLastLine: false,
    wordWrap: 'on',
    wrappingStrategy: 'advanced',
    fontWeight: 'bold',
    overviewRulerLanes: 0,
  };

  const [opened, setOpened] = useState(false);
  const ref = useClickOutside(() => setOpened(false));

  const router = useRouter();
  return (
    <div
      onClick={() => setOpened(true)}
      ref={ref}
      className={`h-fit w-full rounded-[5px] border border-light-border`}
    >
      <BaseComponentV2 {...params} isFocus={opened}>
        <div className={`${opened && ' flex-col '}`}>
          {opened && (
            <CodeToolbar
              language={language}
              setLanguage={setLanguage}
              rerender={() => rerender(random(123))}
              content={params.reference.current.content}
            />
          )}
          <CodeComponentEditor
            onChange={(value) => {
              params.reference.current.content.code = value;
              rerender(random(123));
            }}
            language={language}
            value={params.reference.current.content.code}
          />
          {(isExercise || runable) && (
            <div className="py-[10px] px-[15px]">
              <PrimaryButton
                text="Run"
                className="rounded-none py-[9px] px-[12px]"
                // onClick={handleRun}
              />
            </div>
          )}
          {
            <CreateTestCaseComponent
              isExercise={isExercise}
              language={language}
              judgeContent={params.reference.current.content.judgeContent}
            />
          }
          {opened && isExercise && isSample && (
            <>
              <Editor
                defaultLanguage={language === 'c++' ? 'c' : language}
                defaultValue={executeCode}
                theme="vs-dark"
                // onMount={onExecuteCodeMount}
                value={executeCode}
                // onChange={onExecuteCodeChange}
                options={options}
                language={language === 'c++' ? 'c' : language}
              />
            </>
          )}
          <ResultTable isWaitingExecute={isWaitingExecute} />
        </div>
      </BaseComponentV2>
    </div>
  );
};
