import axiosClient from '../axiosClient';
import type { BaseQuery, BaseReadResponse } from '../baseHttp';
import type { ListCourseItemResponse } from '../instructor/course';

export interface CreateCategoryRequest {
  name: string;
  order: number;
  description: string;
  thumbnail: string;
}

export interface CreateCategoryReponse {
  name: string;
  description: string;
  thumbnail: string;
  order: number;
  id: number;
  deleted_at: null;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface SaveSettingRequest {
  key: string;
  title: string;
  value: any[];
}

export interface SettingResponse {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  key: string;
  values: string[];
  title: string;
}

export interface CourseCategory {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  name: string;
  description: string;
  thumbnail: string;
  is_active: boolean;
  order: number;
}

export interface AdminCountCourseResponse {
  all: number;
  published: number;
  reviewing: number;
  rejected: number;
}

export interface AdminGetCoursesQuery extends BaseQuery {
  status?: string;
}

const CodedraftsAdminApi = {
  createCategory: (params: CreateCategoryRequest) => {
    return axiosClient.post<CreateCategoryReponse>('/api/admin/category', {
      ...params,
    });
  },
  saveSetting: (params: SaveSettingRequest) => {
    return axiosClient.post('/api/admin/setting', {
      ...params,
    });
  },
  getAllSettings: () => {
    return axiosClient.get<BaseReadResponse<SettingResponse[]>>('/api/admin/setting');
  },
  getSettingByKey: (key: string) => {
    return axiosClient.get<BaseReadResponse<SettingResponse>>(`/api/admin/setting/${key}`);
  },
  getCateSetting: () => {
    return axiosClient.get<BaseReadResponse<CourseCategory[]>>(`/api/category`);
  },
  getCourses: (params: AdminGetCoursesQuery) => {
    return axiosClient.get<BaseReadResponse<ListCourseItemResponse[]>>(`/api/admin/course`, {
      params,
    });
  },
  countCourse: () => {
    return axiosClient.get<BaseReadResponse<AdminCountCourseResponse>>(
      `/api/admin/course/count-course`,
    );
  },
};

export default CodedraftsAdminApi;
