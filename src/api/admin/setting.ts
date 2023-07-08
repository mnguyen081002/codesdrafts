import axiosClient from '../axiosClient';
import type { BaseResponse } from '../baseResponse';

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
  value: string[];
  title: string;
}

export interface CourseSetting {
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

const CodeSmoothAdminApi = {
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
    return axiosClient.get<BaseResponse<SettingResponse[]>>('/api/admin/setting');
  },
  getSettingByKey: (key: string) => {
    return axiosClient.get<BaseResponse<SettingResponse>>(`/api/admin/setting/${key}`);
  },
  getCateSetting: () => {
    return axiosClient.get<BaseResponse<CourseSetting[]>>(`/api/category`);
  },
};

export default CodeSmoothAdminApi;
