import type { ICodeContent, LessonComponentProps } from '../../shared/interface';
import axiosClient from '../axiosClient';
import type { BaseResponse } from '../baseHttp';

export interface SampleTestResponse {
  id: string;
  type: string;
  content: ICodeContent;
}

export interface SaveLessonRequest {
  id: number;
  title: string;
  summary: string;
  section_id: number;
  components: LessonComponentProps[];
}

export interface GetLessonResponse {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  title: string;
  isCompleted: boolean;
  order: number;
  components: LessonComponentProps<ICodeContent>[];
  summary: string;
}

const CodeSmoothInstructorLessonApi = {
  getSampleTest: (language: string) => {
    return axiosClient.get<BaseResponse<SampleTestResponse>>(`/api/instructor/sample/${language}`);
  },
  saveLesson: (data: SaveLessonRequest) => {
    return axiosClient.post<BaseResponse<any>>('/api/instructor/lesson', data);
  },
  getLesson: (id: number) => {
    return axiosClient.get<BaseResponse<GetLessonResponse>>(`/api/instructor/lesson/${id}`);
  },
};

export default CodeSmoothInstructorLessonApi;
