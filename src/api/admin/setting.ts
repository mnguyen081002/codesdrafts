import axiosClient from '../axiosClient';
import type { BaseQuery, BaseReadResponse, BaseResponse } from '../baseHttp';
import type { ListCourseItemResponse } from '../instructor/course';

export interface CreateCategoryRequest {
  name: string;
  order: number;
  description: string;
  thumbnail: string;
}

export interface UpdateCategoryRequest {
  name?: string;
  order?: number;
  description?: string;
  thumbnail?: string;
  is_active?: boolean;
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

const CodedraftsAdminSettingApi = {
  createCategory: (params: CreateCategoryRequest) => {
    return axiosClient.post<BaseResponse>('/api/admin/category', {
      ...params,
    });
  },
  updateCategory: (id: number, params: UpdateCategoryRequest) => {
    return axiosClient.put<BaseResponse>(`/api/admin/category/${id}`, {
      ...params,
    });
  },
  deleteCategory: (id: number) => {
    return axiosClient.delete<BaseResponse>(`/api/admin/category/${id}`);
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
    return axiosClient.get<BaseReadResponse<CourseCategory[]>>(`/api/admin/category`);
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

export default CodedraftsAdminSettingApi;
