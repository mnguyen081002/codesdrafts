import axiosClient from '../axiosClient';

const CodeSmoothAdminCourseApi = {
  approveCourse: (courseId: string) => {
    return axiosClient.patch(`/api/admin/course/publish/${courseId}`);
  },
  rejectCourse: (courseId: string) => {
    return axiosClient.patch(`/api/admin/course/rejected/${courseId}`);
  },
};

export default CodeSmoothAdminCourseApi;
