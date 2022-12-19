import Editor from "@monaco-editor/react";
import { Done, Clear } from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox";
import { editor } from "monaco-editor";
import { FC, useState } from "react";
import { CodeSmoothApi } from "../api/codesmooth-api";
import { useAppDispatch } from "../app/hooks";
import { setCode, setComponent, setIsTest, setLanguage } from "../features/auth/LessonSlice";
import { ComponentType } from "../shared/enum/component";
import { ICodeComponentProps, IComponentProps } from "../shared/interface";
import { TestResult } from "../utils/example";
import { BaseComponent } from "./BaseComponent";

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

  const isTest = params.component.content.isTest;
  const executeCode = params.component.content.judgeContent.executeCode;
  const testCode = params.component.content.judgeContent.testCode;
  const code = params.component.content.code;
  let lang = params.component.content.language;

  const options: editor.IStandaloneEditorConstructionOptions = {
    selectOnLineNumbers: true,
    roundedSelection: false,
    // readOnly: false,
    cursorStyle: "line",
    // automaticLayout: false,
  };

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
    if (lang === "typescript") {
      lang = "c++";
    } else {
      lang = "typescript";
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
      code: monacoInstance?.getValue(),
      executeCode: monacoExecuteInstance?.getValue({ preserveBOM: true, lineEnding: "\n" }),
      testCode: monacoTestInstance?.getValue({ preserveBOM: true, lineEnding: "\n" }),
    }).then((res) => {
      setResults(res.data.data);
    });
  };

  const handleCreateSample = () => {
    CodeSmoothApi.createSampleForLanguage(lang, {
      content: {
        code: monacoInstance?.getValue(),
        judgeContent: {
          testCode: monacoTestInstance?.getValue({ preserveBOM: true, lineEnding: "\n" }),
          executeCode: monacoExecuteInstance?.getValue({ preserveBOM: true, lineEnding: "\n" }),
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
            params.component.isFocus && "border-[3px] border-light-primary"
          }`}
        >
          {params.component.isFocus && (
            <div className="py-3 px-4">
              <div className="flex justify-evenly">
                <div>
                  <span className="mr-4">Language</span>
                  <span className="font-semibold text-2xl">[{lang}]</span>
                </div>
                <span>Time Limit (secs)</span>
              </div>
              <div>
                <span>Exercise</span>
                <Checkbox checked={isTest} onChange={toggleIsTest} style={{ cursor: "pointer" }} />
                <span>Sample</span>
                <Checkbox
                  checked={isSample}
                  onChange={handleCheckSample}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <div>
                <span>Read-only</span> <Checkbox style={{ cursor: "pointer" }} />
              </div>
            </div>
          )}
          <div>
            <Editor
              height="30vh"
              defaultLanguage={lang === "c++" ? "c" : lang}
              defaultValue={code}
              theme="vs-dark"
              onMount={onCodeMount}
              value={code}
              onChange={onCodeChange}
              options={options}
              language={lang}
            />
            {!params.component.isFocus && isTest && (
              <button className="mt-4 ml-3 bg-light-primary text-white rounded-normal px-8 py-2">
                Test
              </button>
            )}
          </div>

          {params.component.isFocus && isTest && (
            <>
              <span>Write test code here</span>
              <Editor
                height="30vh"
                defaultLanguage={lang === "c++" ? "c" : lang}
                defaultValue={testCode}
                theme="vs-dark"
                onMount={onTestCodeMount}
                value={testCode}
                onChange={onTestCodeChange}
                options={options}
                language={lang === "c++" ? "c" : lang}
              />
              <div className="flex justify-center items-center py-4">
                <button
                  onClick={handleRun}
                  className="bg-light-primary mx-2 p-2 rounded-normal text-white"
                >
                  RUN
                </button>
                <button
                  onClick={handleSwitch}
                  className="bg-light-primary mx-2 p-2 rounded-normal text-white"
                >
                  Switch
                </button>

                <button
                  onClick={handleCreateSample}
                  className="bg-light-primary mx-2 p-2 rounded-normal text-white"
                >
                  Create sample for {lang}
                </button>
                <button
                  onClick={handleGetSample}
                  className="bg-light-primary mx-2 p-2 rounded-normal text-white"
                >
                  Get sample for {lang}
                </button>
              </div>
            </>
          )}
          {params.component.isFocus && isTest && isSample && (
            <Editor
              height="40vh"
              defaultLanguage={lang === "c++" ? "c" : lang}
              defaultValue={executeCode}
              theme="vs-dark"
              onMount={onExecuteCodeMount}
              value={executeCode}
              onChange={onExecuteCodeChange}
              options={options}
              language={lang === "c++" ? "c" : lang}
            />
          )}
          {params.component.isFocus && results?.length > 0 && (
            <div className="border-[2px] border-slate-300 mx-10 my-4 pb-6">
              <div className="flex justify-center">
                <table>
                  <caption className="py-8">
                    {
                      <span className="text-lg font-bold text-light-primary tracking-widest">{`${
                        results.filter((i) => i.succeeded).length
                      }\t of \t ${results.length}\t Tests Passed`}</span>
                    }
                  </caption>
                  <tbody>
                    <tr>
                      <td className="px-14 font-semibold border border-slate-300">Result</td>
                      <td className="px-14 font-semibold border border-slate-300">Input</td>
                      <td className="px-14 font-semibold border border-slate-300">
                        Expected Output
                      </td>
                      <td className="px-14 font-semibold border border-slate-300">Actual Output</td>
                      <td className="px-14 font-semibold border border-slate-300">Reason</td>
                    </tr>
                    {results.map((result, index) => {
                      return (
                        <tr key={index}>
                          <td
                            className={`px-14 border-r border-slate-300 border-l ${
                              index === results.length - 1 && "border-b"
                            }`}
                          >
                            {result.succeeded ? <Done style={{ color: "#91ff00" }} /> : <Clear />}
                          </td>
                          <td
                            className={`px-14 border-r border-slate-300 border-l ${
                              index === results.length - 1 && "border-b"
                            }`}
                          >
                            {JSON.stringify(result.input)}
                          </td>
                          <td
                            className={`px-14 border-r border-slate-300 border-l ${
                              index === results.length - 1 && "border-b"
                            }`}
                          >
                            {result.expected_output}
                          </td>
                          <td
                            className={`px-14 border-r border-slate-300 border-l ${
                              index === results.length - 1 && "border-b"
                            }`}
                          >
                            {result.actual_output}
                          </td>
                          <td
                            className={`px-14 border-r border-slate-300 border-l ${
                              index === results.length - 1 && "border-b"
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
