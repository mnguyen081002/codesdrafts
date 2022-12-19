import axiosClient from "./axiosClient";
import type { TestResult } from "../utils/example";
import { ICodeComponent, LessionComponentProps } from "../shared/interface";

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


interface CreateLessionRequest {
  title: string;
  summary: string;
  components: LessionComponentProps[];
}

export const CodeSmoothApi = {
  execute: ({ code, testCode, language, executeCode }: ExecuteRequest) => {
    return axiosClient.post<ExecuteResponse>(`/api/execute/`, {
      code,
      testCode,
      executeCode,
      language,
    });
  },

  createLession: (params: CreateLessionRequest) => {
    return axiosClient.post("/api/admin/lession", {
      title: params.title,
      summary: params.summary,
      components: params.components,
      course_category_id: 544733825231424000,
    });
  },

  getLession: () => {
    return axiosClient.get("/api/admin/lession/208373742449402620");
  },

  getSampleForLanguage: (language: string) => {
    return axiosClient.get(`/api/admin/sample/${language}`);
  },

  createSampleForLanguage: (language: string, sample: ICodeComponent) => {
    return axiosClient.post(`/api/admin/sample`, {
      language,
      sample,
    });
  }
};
