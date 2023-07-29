import axiosClient from '../axiosClient';
import type { BaseGetCourseByIDResponse, Category } from '../base/interface/course';
import type { BaseQuery, BaseReadResponse, BaseResponse } from '../baseHttp';

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
  published_at: string;
  published_course_id?: number;
  draft_course_id?: number;
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

export interface InstructorCountCourseResponse {
  all: number;
  published: number;
  reviewing: number;
  rejected: number;
  draft: number;
}
export interface GetCourseByIDResponse extends BaseGetCourseByIDResponse {
  published_course_id: number;
  rejected_reason: {
    reason: string;
    rejected_at: Date;
    rejected_by: string;
  };
}

export interface CreateCourseRequest {
  name: string;
  description: string;
  short_description: string;
  target_audience: string;
  category_ids: number[];
  requirements: string[];
  objectives: string[];
  thumbnail: string;
  price: number;
  base_price: number;
  feedback_email: string;
}

const CodedraftsInstructorCourseApi = {
  deleteCourse: (id: number) => {
    return axiosClient.delete(`/api/instructor/course/${id}`);
  },
  createCourse: (params: CreateCourseRequest) => {
    return axiosClient.post<BaseResponse>('/api/instructor/course', {
      ...params,
    });
  },
  updateCourse: (id: number, params: CreateCourseRequest) => {
    return axiosClient.put<BaseResponse>(`/api/instructor/course/${id}`, {
      ...params,
    });
  },
  listCourse: (params: InstructorListCourseRequest, token?: string) => {
    return axiosClient.get<BaseReadResponse<ListCourseItemResponse[]>>('/api/instructor/course', {
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
    return axiosClient.get<BaseReadResponse<GetCourseByIDResponse>>(
      `/api/instructor/course/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  },
  submitForReview: (id: number) => {
    return axiosClient.patch<BaseReadResponse<ListCourseItemResponse>>(
      `/api/instructor/course/submit-for-review/${id}`,
    );
  },
  countCourse: () => {
    return axiosClient.get<BaseReadResponse<InstructorCountCourseResponse>>(
      '/api/instructor/course/count-course',
    );
  },
};

export default CodedraftsInstructorCourseApi;
