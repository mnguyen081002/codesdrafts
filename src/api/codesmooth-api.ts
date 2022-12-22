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

  getLession: (id:number) => {
    return axiosClient.get("/api/admin/lession/"+id);
  },

  getSampleForLanguage: (language: string) => {
    return axiosClient.get(`/api/admin/sample/${language}`);
  },

  createSampleForLanguage: (language: string, sample: ICodeComponent) => {
    return axiosClient.post(`/api/admin/sample`, {
      language,
      sample,
    });
  },
  //: Promise<CodeSmoothApiResponse<ListCourseResponse>>
  getListCourses: async (): Promise<CodeSmoothApiResponseList<CourseResponse>> => {
    const response = await axiosClient.get("/api/admin/course");
    return response.data;
  },

  getCourseById: async (id: number): Promise<CodeSmoothApiResponse<CourseResponse>> => {
    const response = await axiosClient.get(`/api/admin/course/${id}`);
    return response.data;
  },
};

export interface CodeSmoothApiResponseList<T> {
  data: T[];
  meta: Meta;
  message: string;
}

export interface CodeSmoothApiResponse<T> {
  data: T;
  message: string;
}

export interface CourseResponse {
  id?: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: null;
  thumbnail: string;
  detail: string;
  target_audience: string;
  skills: string[];
  tags: string[];
  summary: string;
  name: string;
  price: number;
  is_published: boolean;
  category: CategoryResponse[];
}

export interface CategoryResponse {
  id: number;
  title: string;
  lessions: {
    id: number;
    title: string;
  }[];
}

export interface Meta {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
