import axiosClient from '../axiosClient';
import type { SaveCourseRequest } from '../codesmooth-api';

const CodeSmoothCourseApi = {
  saveCourse: (params: SaveCourseRequest) => {
    return axiosClient.post('/api/admin/course', {
      ...params,
    });
  },
};

export default CodeSmoothCourseApi;
