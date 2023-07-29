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

export interface Section {
  id: number;
  title: SectionTitle;
  type: Type;
  order: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: number;
  title: LessonTitle;
  order: number;
  section_id: number;
}

export enum LessonTitle {
  NewLesson = 'New Lesson',
  NodeJSPro1 = 'NodeJs Pro1',
}

export enum SectionTitle {
  NewSection = 'New Section',
  NodeJSProSection1 = 'NodeJs Pro Section 1',
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
