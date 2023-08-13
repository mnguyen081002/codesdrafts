import type { ResLogin, ResRegister, User } from '@/shared/types/authType';

import type { LessonComponentProps } from '../shared/interface';
import type { TestResult } from '../utils/example';
import axiosClient from './axiosClient';
import type { BaseQuery, BaseReadResponse, BaseResponse } from './baseHttp';
import type { ListCourseItemResponse } from './instructor/course';
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

export interface StudentGetLessonByID {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  course_id: null;
  owner_id: number;
  title: string;
  order: number;
  components: any[];
  summary: string;
  is_completed: boolean;
  section_id: number;
  is_first: boolean;
  is_last: boolean;
}
export interface ShortLesson {
  id: number;
  title: string;
  order: number;
  completed_count: number;
  section_id: number;
}

export interface GetSectionWithLessonByCourseIDResponse {
  id: number;
  title: string;
  type: string;
  order: number;
  course_id: number;
  lessons: ShortLesson[];
}

export interface GetLesonBySectionIDResponse {
  id: number;
  course_id: number;
  title: string;
  order: number;
  section_id: number;
  completed_count: number;
}

export const StudentApi = {
  getLessonsBySectionId: (sectionId: number) => {
    return axiosClient.get<BaseReadResponse<GetLesonBySectionIDResponse[]>>(
      `/api/lesson/get-lession-by-section-id/${sectionId}`,
    );
  },
  getLessonById: (id: number, courseId: number) => {
    return axiosClient.get<BaseReadResponse<StudentGetLessonByID>>(`/api/lesson/${id}/${courseId}`);
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
  markLessonComplete: (id: number, course_id: number, isCompleted: boolean) => {
    return axiosClient.post<BaseResponse<null>>(`/api/lesson/mark-as-completed`, {
      lesson_id: id,
      course_id,
      isCompleted,
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
  getSectionWithLessonByCourseId: (id: number) => {
    return axiosClient.get<BaseReadResponse<GetSectionWithLessonByCourseIDResponse[]>>(
      `/api/section/${id}`,
    );
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
  review: ({ course_id, comment, rating }: ReviewRequest) => {
    return axiosClient.post<BaseResponse<null>>('/api/review', {
      course_id,
      comment,
      rating,
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
  loginSocial: async ({ id_token, social }: GoogleRequest) => {
    return axiosClient.post<ResLogin>('/api/auth/login-social', {
      token: id_token,
      social,
    });
  },
  contact: async ({ name, email, message, phone, subject }: ContactRequest) => {
    return axiosClient.post('/api/other/contact', {
      name,
      email,
      phone,
      message,
      subject,
    });
  },
  getListThumbnail: async () => {
    return axiosClient.get<ListThumbnailResponse>('/api/settings/thumbnail');
  },
  getListReviews: async ({ course_id, limit, page }: GetReviewListQuery) => {
    return axiosClient.get<BaseReadResponse<ReviewResponse[]>>(`/api/review/${course_id}`, {
      params: {
        limit,
        page,
      },
    });
  },
  actionReview: async ({ review_id, action }: ActionReviewRequest) => {
    return axiosClient.post<BaseResponse<null>>(`/api/review/${action}/${review_id}`);
  },
};

export interface ActionReviewRequest {
  review_id: number;
  action: 'like' | 'dislike';
}

export interface GetCourseListQuery extends BaseQuery {
  category_id?: number;
}

export interface ReviewResponse {
  id: number;
  created_at: string;
  updated_at: string;
  rating: number;
  comment: string;
  user: User;
  like_count: number;
  dislike_count: number;
  is_like: boolean;
  is_dislike: boolean;
}

export interface GetReviewListQuery {
  course_id?: number;
  limit?: number;
  page?: number;
}

export interface ReviewRequest {
  course_id: number;
  comment: string;
  rating: number;
}

export interface ListThumbnailResponse {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  key: string;
  title: string;
  values: string[];
}

export interface ContactRequest {
  name: string;
  email: string;
  message: string;
  phone: string;
  subject: string;
}

export interface PaymentRequest {
  course_id: number;
  payment_method: string;
}

export interface GoogleRequest {
  id_token: string;
  social: string;
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
