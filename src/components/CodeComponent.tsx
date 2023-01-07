import Editor from '@monaco-editor/react';
import { Clear, Done } from '@mui/icons-material';
import Checkbox from '@mui/material/Checkbox';
import type { editor } from 'monaco-editor';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

import { CodeSmoothApi } from '../api/codesmooth-api';
import { useAppDispatch } from '../app/hooks';
import Button from '../common/Button';
import { setCode, setIsTest, setLanguage } from '../features/auth/LessonSlice';
import { ComponentType } from '../shared/enum/component';
import type { ICodeComponentProps } from '../shared/interface';
import type { TestResult } from '../utils/example';
import { BaseComponent } from './BaseComponent';

export const CodeComponent: FC<ICodeComponentProps> = (params) => {
  const [results, setResults] = useState<TestResult[]>([]);
  const [monacoInstance, setMonacoInstance] = useState<editor.IStandaloneCodeEditor | null>(null);
  const [monacoExecuteInstance, setMonacoExecuteInstance] =
    useState<editor.IStandaloneCodeEditor | null>(null);
  const [monacoTestInstance, setMonacoTestInstance] = useState<editor.IStandaloneCodeEditor | null>(
    null,
  );
  const [isSample, setIsSample] = useState(false);
  const dispatch = useAppDispatch();

  const { isTest } = params.component.content;
  const { executeCode } = params.component.content.judgeContent;
  const { testCode } = params.component.content.judgeContent;
  const { code } = params.component.content;

  let lang = params.component.content.language;

  const options: editor.IStandaloneEditorConstructionOptions = {
    selectionHighlight: false,
    lineNumbers: 'off',
    readOnly: true,
    domReadOnly: true,
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

    instance.layout({ height: contentHeight, width: 1090 });
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

  const handleRun = () => {
    CodeSmoothApi.execute({
      language: lang,
      code: monacoInstance?.getValue({ preserveBOM: true, lineEnding: '\n' }),
      executeCode:
        monacoExecuteInstance?.getValue({ preserveBOM: true, lineEnding: '\n' }) ?? executeCode,
      testCode: monacoTestInstance?.getValue({ preserveBOM: true, lineEnding: '\n' }) ?? testCode,
    }).then((res) => {
      setResults(res.data.data);
    });
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
        isTest: !isTest,
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
      <BaseComponent className="mt-10" {...params}>
        <div
          className={`rounded-md ${
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
                <Checkbox checked={isTest} onChange={toggleIsTest} style={{ cursor: 'pointer' }} />
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
            {!params.component.isFocus && isTest && (
              <Button
                text="Test"
                className="mt-4 ml-3 rounded-normal bg-light-secondary px-8 py-2 font-bold text-white"
                onClick={handleRun}
              />
            )}
          </>

          {params.component.isFocus && isTest && (
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
          {params.component.isFocus && isTest && isSample && (
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
          {results?.length > 0 && (
            <div className="mx-10 my-4 border-[2px] border-slate-300 pb-6">
              <div className="flex justify-center">
                <table>
                  <caption className="py-8">
                    {
                      <span className="text-lg font-bold tracking-widest text-light-primary">{`${
                        results.filter((i) => i.succeeded).length
                      }\t of \t ${results.length}\t Tests Passed`}</span>
                    }
                  </caption>
                  <tbody>
                    <tr>
                      <td className="border border-slate-300 px-14 font-semibold">Result</td>
                      <td className="border border-slate-300 px-14 font-semibold">Input</td>
                      <td className="border border-slate-300 px-14 font-semibold">
                        Expected Output
                      </td>
                      <td className="border border-slate-300 px-14 font-semibold">Actual Output</td>
                      <td className="border border-slate-300 px-14 font-semibold">Reason</td>
                    </tr>
                    {results.map((result, index) => {
                      return (
                        <tr key={index}>
                          <td
                            className={` flex justify-center border-x border-slate-300 px-14${
                              index === results.length - 1 && 'border-b'
                            }`}
                          >
                            {result.succeeded ? <Done style={{ color: '#78cc0b' }} /> : <Clear />}
                          </td>
                          <td
                            className={`border-x border-slate-300 px-14${
                              index === results.length - 1 && 'border-b'
                            }`}
                          >
                            {JSON.stringify(result.input)}
                          </td>
                          <td
                            className={`border-x border-slate-300 px-14${
                              index === results.length - 1 && 'border-b'
                            }`}
                          >
                            {result.expected_output}
                          </td>
                          <td
                            className={`border-x border-slate-300 px-14${
                              index === results.length - 1 && 'border-b'
                            }`}
                          >
                            {result.actual_output}
                          </td>
                          <td
                            className={`border-x border-slate-300 px-14${
                              index === results.length - 1 && 'border-b'
                            }`}
                          >
                            {result.reason}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </BaseComponent>
    </>
  );
};
