import axiosClient from '../axiosClient';
import type { BaseReadResponse } from '../baseHttp';

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
export interface Owner {
  id: number;
}

export interface GetSectionWithLessonByCourseIDResponse {
  id: number;
  title: string;
  type: string;
  order: number;
  course_id: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: number;
  title: string;
  order: number;
  section_id: number;
  completed_count: number;
}

const CodedraftsInstructorSectionApi = {
  addSection: (data: AddSectionRequest) => {
    return axiosClient.post<BaseReadResponse<AddSectionResponse>>(
      `/api/instructor/section/${data.course_id}/${data.order}`,
    );
  },
  deleteSection: (sectionId: number) => {
    return axiosClient.delete<BaseReadResponse<any>>(`/api/instructor/section/${sectionId}`);
  },
  updateSection: (sectionId: number, title: string) => {
    return axiosClient.patch<BaseReadResponse<any>>(`/api/instructor/section/${sectionId}`, {
      title,
    });
  },
  getSectionsWithLessonByCourseId: (courseId: number) => {
    return axiosClient.get<BaseReadResponse<GetSectionWithLessonByCourseIDResponse[]>>(
      `/api/instructor/section/${courseId}`,
    );
  },
};

export default CodedraftsInstructorSectionApi;
