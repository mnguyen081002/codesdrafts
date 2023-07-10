import axiosClient from '../axiosClient';
import type { BaseQuery, BaseResponse } from '../baseHttp';
import type { SaveCourseRequest } from '../codesmooth-api';

export interface ListCourseItemResponse {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  name: string;
  description: string;
  short_description: string;
  price: number;
  target_audience: string;
  requirements: string[];
  thumbnail: string;
  status: string;
  owner_id: number;
  feedback_email: string;
  categories: Category[];
  objectives: string[];
  total_enrollment: number;
  base_price: number;
  parent_id?: number;
  published_at: string;
  owner: {
    id: number;
    username: string;
    email: string;
    avatar: string;
  };
}

export interface InstructorListCourseRequest extends BaseQuery {
  status?: string;
}
export interface Category {
  id: number;
  name: string;
}

export interface InstructorCountCourseResponse {
  all: number;
  published: number;
  reviewing: number;
  rejected: number;
  draft: number;
}

const CodeSmoothInstructorCourseApi = {
  deleteCourse: (id: number) => {
    return axiosClient.delete(`/api/instructor/course/${id}`);
  },
  createCourse: (params: SaveCourseRequest) => {
    return axiosClient.post('/api/instructor/course', {
      ...params,
    });
  },
  updateCourse: (id: number, params: SaveCourseRequest) => {
    return axiosClient.put(`/api/instructor/course/${id}`, {
      ...params,
    });
  },
  listCourse: (params: InstructorListCourseRequest, token?: string) => {
    return axiosClient.get<BaseResponse<ListCourseItemResponse[]>>('/api/instructor/course', {
      params: {
        page: params.page,
        take: params.take,
        sort: params.sort,
        order: params.order,
        q: params.q,
        status: params.status,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getCourseById: (id: number, token?: string) => {
    return axiosClient.get<BaseResponse<ListCourseItemResponse>>(`/api/instructor/course/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  submitForReview: (id: number) => {
    return axiosClient.patch<BaseResponse<ListCourseItemResponse>>(
      `/api/instructor/course/submit-for-review/${id}`,
    );
  },
  countCourse: () => {
    return axiosClient.get<BaseResponse<InstructorCountCourseResponse>>(
      '/api/instructor/course/count-course',
    );
  },
};

export default CodeSmoothInstructorCourseApi;
