import { useClickOutside } from '@mantine/hooks';
import { random } from 'lodash';
import type { editor } from 'monaco-editor';
import type { FC } from 'react';
import { useState } from 'react';

import type { ExecuteResponse } from '../api/codedrafts-api';
import { StudentApi } from '../api/codedrafts-api';
import { LessonComponentType } from '../shared/enum/component';
import type { ICodeComponentPropsV2 } from '../shared/interface';
import { BaseComponentV2 } from './BaseComponent';
import { PrimaryButton } from './Button';
import CodeComponentEditor from './Lesson/CodeEditorComponent';
import CodeToolbar from './Lesson/CodeToolbar';
import CreateTestCaseComponent from './Lesson/CreateTestCase';
import { ResultTable } from './Lesson/ResultTable';

export const CodeComponent: FC<ICodeComponentPropsV2> = (params) => {
  useState<editor.IStandaloneCodeEditor | null>(null);
  const [isWaitingExecute, setIsWaitingExecute] = useState(false);
  const [isSample, setIsSample] = useState(false);
  const [result, setResult] = useState<ExecuteResponse>();
  params.reference.current =
    params.reference.current?.type === LessonComponentType.Code
      ? params.reference.current
      : {
          type: LessonComponentType.Code,
          content: {
            isReadOnly: false,
            isExercise: false,
            allowDownload: false,
            language: 'typescript',
            code: '',
            judgeContent: {
              testCode: '',
              answerCode: '',
              sampleCode: '',
              baseOn: 'CodeResults',
            },
            runable: false,
            timeLimit: 0,
          },
        };

  const { isExercise, runable } = params.reference.current.content;
  // const { executeCode } = params.reference.current.content.judgeContent;
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

  const handleRun = async () => {
    setIsWaitingExecute(true);
    const r = await StudentApi.execute({
      code: params.reference.current.content.code,
      testCode: params.reference.current.content.judgeContent.testCode,
      language: params.reference.current.content.language,
    });
    setIsWaitingExecute(false);
    setResult(r.data.data);
  };
  return (
    <div
      onClick={() => setOpened(true)}
      ref={ref}
      className={`h-fit w-full rounded-[5px] border border-light-border`}
    >
      <BaseComponentV2 {...params}>
        <div className={`${opened && ' flex-col '}`}>
          {opened && !params.isReadOnly && (
            <CodeToolbar
              language={language}
              setLanguage={setLanguage}
              rerender={() => rerender(random(123))}
              content={params.reference.current.content}
            />
          )}
          <CodeComponentEditor
            onChange={(value) => {
              if (!params.reference.current) return;
              params.reference.current.content.code = value;
              rerender(random(123));
            }}
            disableValidation
            language={language}
            value={params.reference.current.content.code}
          />
          {(isExercise || runable) && (
            <div className="py-[10px] px-[15px]">
              <PrimaryButton
                text="Run"
                className="rounded-none py-[9px] px-[12px]"
                onClick={handleRun}
              />
            </div>
          )}
          {opened && !params.isReadOnly && (
            <CreateTestCaseComponent
              isExercise={isExercise}
              language={language}
              content={params.reference.current.content}
              rerender={() => rerender(random(123))}
            />
          )}
          {/* {opened && isExercise && isSample && (
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
          )} */}
          <ResultTable results={result} isWaitingExecute={isWaitingExecute} />
        </div>
      </BaseComponentV2>
    </div>
  );
};
