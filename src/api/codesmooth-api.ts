import axiosClient from "./axiosClient";
import type { TestResult } from "../utils/example";

interface ExecuteRequest {
  code: string | undefined;
  testCode: string | undefined;
}

interface ExecuteResponse {
  data: TestResult[];
}

interface ExecuteRequest {
  language: string;
  testCode: string | undefined;
  code: string | undefined;
  executeCode: string | undefined;
}

interface ContentCode {
  content: {
    code: string | undefined;
    judgeContent: {
      testCode: string | undefined;
      executeCode: string | undefined;
    };
    language: string;
    runable: boolean;
    timeLimit: number;
    allowDownload: false;
  };
  type: string;
}

interface LessionComponent {
  type: string;
  content: ContentCode | any;
}
interface CreateLessionRequest {
  title: string;
  components: LessionComponent[];
}

export const CodeSmoothApi = {
  execute: ({ code, testCode, language, executeCode }: ExecuteRequest) => {
    return axiosClient.post<ExecuteResponse>(`/api/execute/${language}`, {
      code,
      testCode,
      executeCode,
    });
  },

  createLession: (params: CreateLessionRequest) => {
    return axiosClient.post("/api/admin/lession", {
      title: "Test lession",
      components: params.components,
      course_category_id: 544733825231424000,
    });
  },

  getLession: () => {
    return axiosClient.get("/api/admin/lession/624938522807339300");
  },

  getSampleForLanguage: (language: string) => {
    return axiosClient.get(`/api/admin/sample/${language}`);
  },

  createSampleForLanguage: (language: string, sample: ContentCode) => {
    return axiosClient.post(`/api/admin/sample`, {
      language,
      sample,
    });
  }
};
