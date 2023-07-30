import axiosClient from '../axiosClient';
import type { BaseGetCourseByIDResponse } from '../base/interface/course';
import type { BaseReadResponse } from '../baseHttp';

export interface GetCourseByIDResponse extends BaseGetCourseByIDResponse {
  is_bought: boolean;
}

export interface Owner {
  id: number;
  username: string;
  email: string;
  avatar: string;
}

export enum LessonTitle {
  NewLesson = 'New Lesson',
}

export enum SectionTitle {
  NewSection = 'New Section',
}

export enum Type {
  Section = 'SECTION',
}

const StudentCourseApi = {
  getById: async (id: number) => {
    return axiosClient.get<BaseReadResponse<GetCourseByIDResponse>>(`/api/course/${id}`);
  },
};

export default StudentCourseApi;
