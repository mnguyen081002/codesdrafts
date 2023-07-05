import axiosClient from '../axiosClient';

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

const CodeSmoothAdminApi = {
  createCategory: (params: CreateCategoryRequest) => {
    return axiosClient.post<CreateCategoryReponse>('/api/admin/category', {
      ...params,
    });
  },
};

export default CodeSmoothAdminApi;
