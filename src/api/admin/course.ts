import axiosClient from '../axiosClient';

const CodedraftsAdminCourseApi = {
  approveCourse: (courseId: string) => {
    return axiosClient.patch(`/api/admin/course/publish/${courseId}`);
  },
  rejectCourse: (courseId: string) => {
    return axiosClient.patch(`/api/admin/course/rejected/${courseId}`);
  },
};

export default CodedraftsAdminCourseApi;
