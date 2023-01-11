import Editor from '@monaco-editor/react';
import { Clear, Done } from '@mui/icons-material';
import Checkbox from '@mui/material/Checkbox';
import type { editor } from 'monaco-editor';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';

import type { ExecuteResponse } from '../api/codesmooth-api';
import { CodeSmoothApi } from '../api/codesmooth-api';
import { useAppDispatch } from '../app/hooks';
import Button from '../common/Button';
import { CircleLoading } from '../common/Loading';
import { setSnackBar } from '../features/auth/appSlice';
import { setCode, setIsTest, setLanguage } from '../features/auth/LessonSlice';
import { ComponentType } from '../shared/enum/component';
import type { ICodeComponentProps } from '../shared/interface';
import { BaseComponent } from './BaseComponent';

function ResultExecuteTable(props) {
  return (
    <tr>
      <td className=" border-b border-l border-slate-300">
        <div className="flex justify-center">
          {props.result.succeeded ? (
            <Done
              style={{
                color: '#78cc0b',
              }}
            />
          ) : (
            <Clear className="text-light-error-content" />
          )}
        </div>
      </td>
      <td className=" border-b border-l border-slate-300">
        <div className="flex justify-center">{JSON.stringify(props.result.input)}</div>
      </td>
      <td
        className={`border border-slate-300 px-14${
          props.index === props.result.length - 1 && 'border-b'
        }`}
      >
        <div className="flex justify-center">{props.result.expected_output}</div>
      </td>
      <td
        className={`border border-slate-300 px-14${
          props.index === props.result.length - 1 && 'border-b'
        }`}
      >
        <div className="flex justify-center">{props.result.actual_output}</div>
      </td>
      <td
        className={`border border-slate-300 px-14${
          props.index === props.result.length - 1 && 'border-b'
        }`}
      >
        <div className="flex justify-center">{props.result.reason}</div>
      </td>
    </tr>
  );
}

const ExecuteResult: FC<{
  executeRes: ExecuteResponse;
}> = (props) => {
  return props.executeRes.is_success ? (
    <div className="mb-6 flex justify-center">
      <table className="w-[70%]">
        <caption className="py-8">
          {
            <span className="text-lg font-bold tracking-widest text-light-primary">{`${
              props.executeRes.results.filter((i) => i.succeeded).length
            }\t of \t ${props.executeRes.results.length}\t Tests Passed`}</span>
          }
        </caption>
        <tbody>
          <tr>
            <td className="border border-slate-300 px-8 font-bold">Result</td>
            <td className="border border-slate-300 px-8 font-bold">Input</td>
            <td className="border border-slate-300 px-8 font-bold">Expected Output</td>
            <td className="border border-slate-300 px-8 font-bold">Actual Output</td>
            <td className="border border-slate-300 px-8 font-bold">Reason</td>
          </tr>
          {props.executeRes.results.map((result, index) => {
            return (
              <ResultExecuteTable key={index} result={result} index={index}></ResultExecuteTable>
            );
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="m-4 flex w-full flex-col">
      <span className=" text-gray-600">Output</span>
      <div className=" rounded-lg border border-light-error-content bg-light-grayDarker p-4">
        <span className="whitespace-pre-line">{props.executeRes.error}</span>
      </div>
    </div>
  );
};

export const CodeComponent: FC<ICodeComponentProps> = (params) => {
  const [executeRes, setExecuteRes] = useState<ExecuteResponse>();
  const [monacoInstance, setMonacoInstance] = useState<editor.IStandaloneCodeEditor | null>(null);
  const [monacoExecuteInstance, setMonacoExecuteInstance] =
    useState<editor.IStandaloneCodeEditor | null>(null);
  const [monacoTestInstance, setMonacoTestInstance] = useState<editor.IStandaloneCodeEditor | null>(
    null,
  );
  const [isWaitingExecute, setIsWaitingExecute] = useState(false);
  const [isSample, setIsSample] = useState(false);
  const dispatch = useAppDispatch();

  const { isTest: isExercise } = params.component.content;
  const { executeCode } = params.component.content.judgeContent;
  const { testCode } = params.component.content.judgeContent;
  const { code } = params.component.content;
  const ref = useRef<HTMLDivElement>(null);
  let lang = params.component.content.language;

  const options: editor.IStandaloneEditorConstructionOptions = {
    selectionHighlight: false,
    lineNumbers: 'off',
    readOnly: !params.component.content.isTest,
    domReadOnly: !params.component.content.isTest,
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
    padding: {
      top: 10,
      bottom: 10,
    },
  };

  const updateHeight = (instance: editor.IStandaloneCodeEditor | null) => {
    if (!instance) {
      return;
    }
    console.log('contentHeight monacoInstance', instance?.getContentHeight(), instance?.getValue());
    const contentHeight = Math.min(800, instance.getContentHeight());
    instance.layout({ height: contentHeight, width: ref.current?.offsetWidth! });
  };

  useEffect(() => {
    updateHeight(monacoInstance);
    updateHeight(monacoTestInstance);
    updateHeight(monacoExecuteInstance);
  }, [monacoInstance, monacoTestInstance, monacoExecuteInstance]);

  monacoInstance?.onDidContentSizeChange(() => {
    updateHeight(monacoInstance);
  });

  monacoTestInstance?.onDidContentSizeChange(() => {
    updateHeight(monacoTestInstance);
  });

  monacoExecuteInstance?.onDidContentSizeChange(() => {
    updateHeight(monacoExecuteInstance);
  });

  const onCodeMount = (editor: editor.IStandaloneCodeEditor) => {
    setMonacoInstance(editor);
  };

  const onTestCodeMount = (editor: editor.IStandaloneCodeEditor) => {
    setMonacoTestInstance(editor);
  };

  const onExecuteCodeMount = (editor: editor.IStandaloneCodeEditor) => {
    setMonacoExecuteInstance(editor);
  };

  const onCodeChange = (value: string | undefined) => {
    dispatch(
      setCode({
        index: params.index!,
        code: value,
      }),
    );
  };

  const onTestCodeChange = (value: string | undefined) => {
    dispatch(
      setCode({
        index: params.index!,
        testCode: value,
      }),
    );
  };

  const onExecuteCodeChange = (value: string | undefined) => {
    dispatch(
      setCode({
        index: params.index!,
        executeCode: value,
      }),
    );
    // setExecuteCode(value);
  };

  const handleSwitch = () => {
    if (lang === 'typescript') {
      lang = 'c++';
    } else {
      lang = 'typescript';
    }
    dispatch(
      setLanguage({
        index: params.index!,
        language: lang,
      }),
    );
  };

  const handleRun = async () => {
    setIsWaitingExecute(true);
    try {
      const res = await CodeSmoothApi.execute({
        language: lang,
        code: monacoInstance?.getValue({ preserveBOM: true, lineEnding: '\n' }),
        executeCode:
          monacoExecuteInstance?.getValue({ preserveBOM: true, lineEnding: '\n' }) ?? executeCode,
        testCode: monacoTestInstance?.getValue({ preserveBOM: true, lineEnding: '\n' }) ?? testCode,
      });
      setExecuteRes(res.data.data);
    } catch (error: any) {
      dispatch(setSnackBar({ message: error.message, type: 'error' }));
    }

    setIsWaitingExecute(false);
  };

  const handleCreateSample = () => {
    CodeSmoothApi.createSampleForLanguage(lang, {
      content: {
        code: monacoInstance?.getValue(),
        judgeContent: {
          testCode: monacoTestInstance?.getValue({ preserveBOM: true, lineEnding: '\n' }),
          executeCode: monacoExecuteInstance?.getValue({ preserveBOM: true, lineEnding: '\n' }),
        },
        language: lang,
        runable: false,
        timeLimit: 100,
        allowDownload: false,
      },
      type: ComponentType.Code,
    });
  };

  const handleCheckSample = () => {
    setIsSample(!isSample);
  };

  const toggleIsTest = () => {
    dispatch(
      setIsTest({
        index: params.index!,
        isTest: !isExercise,
      }),
    );
  };

  const handleGetSample = () => {
    CodeSmoothApi.getSampleForLanguage(lang).then((res) => {
      const { code } = res.data.content;
      const { testCode, executeCode } = res.data.content.judgeContent;
      dispatch(
        setCode({
          index: params.index!,
          code,
          executeCode,
          testCode,
        }),
      );
    });
  };
  return (
    <>
      <BaseComponent baseRef={ref} {...params}>
        <div
          className={`overflow-hidden ${
            params.component.isFocus && 'border-[3px] border-light-primary'
          }`}
        >
          {params.component.isFocus && !params.isReadOnly && (
            <div className="py-3 px-4">
              <div className="flex justify-evenly">
                <div>
                  <span className="mr-4">Language</span>
                  <span className="text-2xl font-semibold">[{lang}]</span>
                </div>
                <span>Time Limit (secs)</span>
              </div>
              <div>
                <span>Exercise</span>
                <Checkbox
                  checked={isExercise}
                  onChange={toggleIsTest}
                  style={{ cursor: 'pointer' }}
                />
                <span>Sample</span>
                <Checkbox
                  checked={isSample}
                  onChange={handleCheckSample}
                  style={{ cursor: 'pointer' }}
                />
              </div>
              <div>
                <span>Read-only</span> <Checkbox style={{ cursor: 'pointer' }} />
              </div>
            </div>
          )}
          <>
            <Editor
              defaultLanguage={lang === 'c++' ? 'c' : lang}
              defaultValue={code}
              theme="vs-dark"
              onMount={onCodeMount}
              value={code}
              onChange={onCodeChange}
              options={options}
              language={lang === 'c++' ? 'c' : lang}
            />
            {!params.component.isFocus && isExercise && (
              <Button
                text="Run"
                className="mt-5 rounded-sm border-none bg-light-primary font-semibold text-white hover:bg-light-tertiary hover:shadow-none"
                onClick={handleRun}
              />
            )}
          </>

          {params.component.isFocus && isExercise && (
            <>
              <span>Write test code here</span>
              <Editor
                className="w-full"
                defaultLanguage={lang === 'c++' ? 'c' : lang}
                defaultValue={testCode}
                theme="vs-dark"
                onMount={onTestCodeMount}
                value={testCode}
                onChange={onTestCodeChange}
                options={options}
                language={lang === 'c++' ? 'c' : lang}
              />
              <div className="flex items-center justify-center py-4">
                <button
                  onClick={handleRun}
                  className="mx-2 rounded-normal bg-light-primary p-2 text-white"
                >
                  RUN
                </button>
                <button
                  onClick={handleSwitch}
                  className="mx-2 rounded-normal bg-light-primary p-2 text-white"
                >
                  Switch
                </button>

                <button
                  onClick={handleCreateSample}
                  className="mx-2 rounded-normal bg-light-primary p-2 text-white"
                >
                  Create sample for {lang}
                </button>
                <button
                  onClick={handleGetSample}
                  className="mx-2 rounded-normal bg-light-primary p-2 text-white"
                >
                  Get sample for {lang}
                </button>
              </div>
            </>
          )}
          {params.component.isFocus && isExercise && isSample && (
            <>
              <Editor
                defaultLanguage={lang === 'c++' ? 'c' : lang}
                defaultValue={executeCode}
                theme="vs-dark"
                onMount={onExecuteCodeMount}
                value={executeCode}
                onChange={onExecuteCodeChange}
                options={options}
                language={lang === 'c++' ? 'c' : lang}
              />
            </>
          )}
          {(isWaitingExecute || executeRes) && (
            <div className="my-4 flex items-center justify-center border border-slate-300">
              {isWaitingExecute ? (
                <div className="flex h-16 items-center justify-center gap-2">
                  <CircleLoading />
                  <span className="font-semibold">Waiting for result...</span>
                </div>
              ) : (
                <ExecuteResult executeRes={executeRes!}></ExecuteResult>
              )}
            </div>
          )}
        </div>
      </BaseComponent>
    </>
  );
};
