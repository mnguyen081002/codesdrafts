import type { ResLogin, ResRegister } from '@/shared/types/authType';

import type { LessonComponentProps } from '../shared/interface';
import type { TestResult } from '../utils/example';
import CodedraftsAdminSettingApi from './admin/setting';
import axiosClient from './axiosClient';
import type { BaseQuery, BaseReadResponse, BaseResponse } from './baseHttp';
import type { ListCourseItemResponse } from './instructor/course';
import CodedraftsInstructorCourseApi from './instructor/course';
import type { GetCourseByIDResponse } from './student/course';

export interface CodedraftsApiResponseList<T> {
  data: T[];
  meta: Meta;
  message: string;
}

export interface CodedraftsApiResponse<T> {
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
}

export interface SaveLessonRequest {
  id: number;
  course_category_id: number;
  title: string;
  section_id: number;
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

export interface GetCourseListQuery extends BaseQuery {
  category_id?: number;
}

export interface GetCategoriesPublicResponse {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  name: string;
  description: string;
  thumbnail: string;
  is_active: boolean;
  order: number;
}

export interface CalculatePaymentResponse {
  price: number;
  discount: number;
  total: number;
}

export const CodedraftsApi = {
  Admin: {
    Setting: CodedraftsAdminSettingApi,
  },
  Instructor: {
    Course: CodedraftsInstructorCourseApi,
  },
  calculatePayment: (props: { course_id: number }) => {
    return axiosClient.post<BaseResponse<CalculatePaymentResponse>>(
      '/api/payment/calculate',
      props,
    );
  },
  verifyEmail: (token: string) => {
    return axiosClient.post('/api/auth/verify-email', {
      token,
    });
  },
  resetPassword: (token: string, password: string) => {
    return axiosClient.post('/api/auth/reset-password', {
      token,
      password,
    });
  },
  forgotPassword: (email: string) => {
    return axiosClient.post('/api/auth/forgot-password', {
      email,
    });
  },
  getMyCourseList: (props: GetCourseListQuery) => {
    return axiosClient.get<BaseReadResponse<ListCourseItemResponse[]>>('/api/course/my-course', {
      params: props,
    });
  },
  getCourseList: (props: GetCourseListQuery) => {
    return axiosClient.get<BaseReadResponse<ListCourseItemResponse[]>>('/api/course', {
      params: props,
    });
  },
  getCourseById: (id: number) => {
    return axiosClient.get<BaseReadResponse<GetCourseByIDResponse>>(`/api/course/${id}`);
  },
  getCategories: () => {
    return axiosClient.get<BaseReadResponse<GetCategoriesPublicResponse[]>>('/api/category');
  },
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

  execute: ({ code, testCode, language }: ExecuteRequest) => {
    return axiosClient.post<CodedraftsApiResponse<ExecuteResponse>>(`/api/execute/`, {
      code,
      testCode,
      language,
    });
  },
  login: async (email: string, password: string) => {
    return axiosClient.post<ResLogin>('/api/auth/login', {
      email,
      password,
      requestFrom: 'CMS',
    });
  },
  register: async (email: string, username: string, password: string) => {
    return axiosClient.post<ResRegister>('/api/auth/register', {
      email,
      username,
      password,
    });
  },
  payment({ course_id, payment_method }: PaymentRequest) {
    return axiosClient.post<PaymentResponse>('/api/payment/create-payment-url', {
      course_id,
      payment_method,
    });
  },
};

export interface PaymentRequest {
  course_id: number;
  payment_method: string;
}

export interface PaymentResponse {
  message: string;
  data: string;
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
