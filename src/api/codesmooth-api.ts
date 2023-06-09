import type { ResLogin } from '@/shared/types/authType';

import type { CourseCategoryType } from '../shared/enum/category';
import type { ICodeComponent, LessonComponentProps } from '../shared/interface';
import type { TestResult } from '../utils/example';
import axiosClient from './axiosClient';

export interface CodeSmoothApiResponseList<T> {
  data: T[];
  meta: Meta;
  message: string;
}

export interface CodeSmoothApiResponse<T> {
  data: T;
  message: string;
}
interface ExecuteRequest {
  code: string | undefined;
  testCode: string | undefined;
}

export interface ExecuteResponse {
  results: TestResult[];
  is_success: boolean;
  error?: string;
}

interface ExecuteRequest {
  language: string;
  testCode: string | undefined;
  code: string | undefined;
  executeCode: string | undefined;
}

export interface SaveLessonRequest {
  id: number;
  course_category_id: number;
  title: string;
  summary: string;
  components: LessonComponentProps[];
}

export interface AddLessonRequest {
  id: number;
  course_category_id: number;
  title: string;
  summary: string;
  order: number;
  components: LessonComponentProps[];
}

export interface SaveCourseRequest {
  id: number;
  name: string;
  summary: string;
  thumbnail: string;
  price: number;
  tags: string[];
  will_learns: string[];
  requirements: string[];
}

export const CodeSmoothApi = {
  uploadFiles: (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
    return axiosClient.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  execute: ({ code, testCode, language, executeCode }: ExecuteRequest) => {
    return axiosClient.post<CodeSmoothApiResponse<ExecuteResponse>>(`/api/execute/`, {
      code,
      testCode,
      executeCode,
      language,
    });
  },

  deleteLessonById(id: number) {
    return axiosClient.delete(`/api/admin/lesson/${id}`);
  },

  createCategory: (
    title: string,
    id: number,
    course_id: number,
    type: CourseCategoryType,
    order?: number,
  ) => {
    return axiosClient.post('/api/admin/category', {
      title,
      id: Number(id),
      order,
      type,
      courseId: Number(course_id),
    });
  },

  updateCategory: (title: string, id: number) => {
    return axiosClient.patch(`/api/admin/category/${id}`, {
      title,
    });
  },

  deleteCategoryById: (id: number) => {
    return axiosClient.delete(`/api/admin/category/${id}`);
  },

  saveLesson: (params: SaveLessonRequest) => {
    const copy = params.components.map((component) => {
      return {
        ...component,
        content: {
          ...component.content,
        },
      };
    });
    // delete isFocus
    copy.forEach((component) => {
      delete component.isFocus;
    });

    return axiosClient.post('/api/admin/lesson', {
      id: Number(params.id),
      title: params.title,
      summary: params.summary,
      components: copy,
      course_category_id: Number(params.course_category_id),
    });
  },

  addLesson: (params: AddLessonRequest) => {
    const copy = params.components.map((component) => {
      return {
        ...component,
        content: {
          ...component.content,
        },
      };
    });
    // delete isFocus
    copy.forEach((component) => {
      delete component.isFocus;
    });

    return axiosClient.post('/api/admin/lesson/add', {
      id: Number(params.id),
      title: params.title,
      summary: params.summary,
      components: copy,
      order: params.order,
      course_category_id: Number(params.course_category_id),
    });
  },

  getLessonById: async (id: number) => {
    return (await axiosClient.get(`/api/admin/lesson/${id}`)).data;
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

  saveCourse: (params: SaveCourseRequest) => {
    return axiosClient.post('/api/admin/course', {
      ...params,
      id: Number(params.id),
    });
  },
  // : Promise<CodeSmoothApiResponse<ListCourseResponse>>
  getListCourses: async (): Promise<CodeSmoothApiResponseList<CourseResponse>> => {
    const response = await axiosClient.get('/api/admin/course');
    return response.data;
  },

  getCourseById: async (id: number): Promise<CodeSmoothApiResponse<CourseResponse>> => {
    const response = await axiosClient.get(`/api/admin/course/${id}`);
    return response.data;
  },

  deleteCourseById: async (id: number): Promise<CodeSmoothApiResponse<CourseResponse>> => {
    const response = await axiosClient.delete(`/api/admin/course/${id}`);
    return response.data;
  },

  markLessonComplete: async (
    lessonId: number,
    markIsComplete?: boolean,
  ): Promise<CodeSmoothApiResponse<CourseResponse>> => {
    const response = await axiosClient.post(`/api/admin/lesson/mark-as-completed`, {
      lesson_id: lessonId,
      isCompleted: markIsComplete ?? false,
    });
    return response.data;
  },

  login: async (email: string, password: string) => {
    return axiosClient.post<ResLogin>('/api/auth/login', {
      email,
      password,
      requestFrom: 'CMS',
    });
  },
};

export interface CourseResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: null;
  will_learns: string[];
  requirements: string[];
  thumbnail: string;
  target_audience: string;
  skills: string[];
  tags: string[];
  summary: string;
  name: string;
  price: number;
  is_published: boolean;
  category: CategoryResponse[];
}
export interface LessonInCategoryResponse {
  id: number;
  title: string;
  isCompleted?: boolean;
}

export interface CategoryResponse {
  id: number;
  title: string;
  lessons: LessonInCategoryResponse[];
  order: number;
}

export interface Meta {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
