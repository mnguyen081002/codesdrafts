import axiosClient from '../axiosClient';
import type { BaseResponse } from '../baseHttp';

interface AddSectionRequest {
  course_id: number;
  order: number;
}
export interface AddSectionResponse {
  title: string;
  type: string;
  order: number;
  course_id: number;
  owner: Owner;
  lessons: Lesson[];
  id: number;
  deleted_at: null;
  created_at: string;
  updated_at: string;
}
export interface Lesson {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  title: string;
  isCompleted: boolean;
  order: number;
  components: any[];
  summary: string;
  section_id: number;
  course: Owner;
}

export interface Owner {
  id: number;
}

const CodeSmoothInstructorSectionApi = {
  addSection: (data: AddSectionRequest) => {
    return axiosClient.post<BaseResponse<AddSectionResponse>>(
      `/api/instructor/section/${data.course_id}/${data.order}`,
    );
  },
  deleteSection: (sectionId: number) => {
    return axiosClient.delete<BaseResponse<any>>(`/api/instructor/section/${sectionId}`);
  },
  updateSection: (sectionId: number, title: string) => {
    return axiosClient.patch<BaseResponse<any>>(`/api/instructor/section/${sectionId}`, {
      title,
    });
  },
};

export default CodeSmoothInstructorSectionApi;
