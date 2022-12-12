// const fetcher = (url: string) => fetch(url).then((res) => res.json());
import Editor from "@monaco-editor/react";
import { Clear, Done } from "@mui/icons-material";
import type { editor } from "monaco-editor";
import { useEffect, useState } from "react";

import { CodeSmoothApi } from "../api/codesmooth-api";
import { TestResult } from "../utils/example";

const Course = () => {
  // const { courseId } = useParams();
  // const { data, error } = useSWR(`/api/courses/${courseId}`, fetcher);

  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;
  const [code, setCode] = useState<string | undefined>("");
  const [testCode, setTestCode] = useState<string | undefined>("");
  const [executeCode, setExecuteCode] = useState<string | undefined>("");
  const [results, setResults] = useState<TestResult[]>([]);
  const [monacoInstance, setMonacoInstance] = useState<editor.IStandaloneCodeEditor | null>(null);
  const [monacoExecuteInstance, setMonacoExecuteInstance] =
    useState<editor.IStandaloneCodeEditor | null>(null);
  const [monacoTestInstance, setMonacoTestInstance] = useState<editor.IStandaloneCodeEditor | null>(
    null,
  );
  const [language, setLanguage] = useState<string>("c");

  useEffect(() => {
    
  }, []);

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
    setCode(value);
  };

  const onTestCodeChange = (value: string | undefined) => {
    setTestCode(value);
  };

  const onExecuteCodeChange = (value: string | undefined) => {
    setExecuteCode(value);
  };

  const handleSwitch = () => {
    if (language === "typescript") {
      setLanguage("c");
    } else {
      setLanguage("typescript");
    }
  };

  const handleRun = () => {
    console.log(executeCode);
    CodeSmoothApi.execute({
      language,
      code,
      testCode,
      executeCode,
    }).then((res) => {
      console.log(res);
      setResults(res.data.data);
    });
  };

  const handleSave = () => {
    console.log(code);
    CodeSmoothApi.createLession({
      components: [
        {
          content: {
            code: monacoInstance?.getValue(),
            judgeContent: {
              testCode: monacoTestInstance?.getValue({ preserveBOM: true, lineEnding: "\n" }),
              executeCode: monacoExecuteInstance?.getValue({ preserveBOM: true, lineEnding: "\n" })
            },
            language: language,
            runable: false,
            timeLimit: 100,
            allowDownload: false,
          },
          type: "Code",
        },
      ],
      title: "test",
    });
  };

  const handleCreateSample = () => {
    CodeSmoothApi.createSampleForLanguage(language, {
      content: {
        code: monacoInstance?.getValue(),
        judgeContent: {
          testCode: monacoTestInstance?.getValue({ preserveBOM: true, lineEnding: "\n" }),
          executeCode: monacoExecuteInstance?.getValue({ preserveBOM: true, lineEnding: "\n" }),
        },
        language: language,
        runable: false,
        timeLimit: 100,
        allowDownload: false,
      },
      type: "Code"
    })
  };

  const handleGetSample = () => {
    CodeSmoothApi.getSampleForLanguage(language).then((res) => {
      const { code } = res.data.content;
      console.log(res.data.content);
      const { testCode, executeCode } = res.data.content.judgeContent;
      setCode(code);
      setTestCode(testCode);
      setExecuteCode(executeCode);
    });
  };
  
  return (
    <div className="flex justify-center">
      <div className="w-[50%]">
        <h1>Course</h1>
        <Editor
          height="40vh"
          defaultLanguage={language}
          defaultValue={code}
          theme="vs-dark"
          onMount={onCodeMount}
          value={code}
          onChange={onCodeChange}
          options={options}
          language={language}
        />
        <span>Write test code here</span>
        <Editor
          height="40vh"
          defaultLanguage={language}
          defaultValue={testCode}
          theme="vs-dark"
          onMount={onTestCodeMount}
          value={testCode}
          onChange={onTestCodeChange}
          options={options}
          language={language}
        />
        <Editor
          height="40vh"
          defaultLanguage={language}
          defaultValue={executeCode}
          theme="vs-dark"
          onMount={onExecuteCodeMount}
          value={executeCode}
          onChange={onExecuteCodeChange}
          options={options}
          language={language}
        />
        <button onClick={handleRun} className="bg-blue-400 mx-3 p-5 text-white">
          RUN
        </button>
        <button onClick={handleSave} className="bg-blue-400 mx-3 p-5 text-white">
          SAVE
        </button>
        <button onClick={handleSwitch} className="bg-blue-400 mx-3 p-5 text-white">
          Switch
        </button>

        <button onClick={handleCreateSample} className="bg-blue-400 mx-3 p-5 text-white">
          Create sample for {language === "c" ? "c++" : "typescript"}
        </button>
        <button onClick={handleGetSample} className="bg-blue-400 mx-3 p-5 text-white">
          Get sample for {language === "c" ? "c++" : "typescript"}
        </button>

        {results?.length > 0 && (
          <div className="h-40 w-full bg-gray-200">
            <div>
              <span>Results</span>
            </div>
            <div className="flex justify-center">
              <table>
                <caption>
                  {
                    <span>{`${results.filter((i) => i.succeeded).length} Of ${
                      results.length
                    } success`}</span>
                  }
                </caption>
                <tbody>
                  <tr>
                    <td className="px-14">Result</td>
                    <td className="px-14">Input</td>
                    <td className="px-14">Expected Output</td>
                    <td className="px-14">Actual Output</td>
                    <td className="px-14">Reason</td>
                  </tr>
                  {results.map((result, index) => {
                    return (
                      <tr key={index}>
                        <td>{result.succeeded ? <Done /> : <Clear />}</td>
                        <td>{JSON.stringify(result.input)}</td>
                        <td>{result.expected_output}</td>
                        <td>{result.actual_output}</td>
                        <td>{result.reason}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Course;
