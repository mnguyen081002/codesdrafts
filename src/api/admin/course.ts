import axiosClient from '../axiosClient';

const CodedraftsAdminCourseApi = {
  approveCourse: (courseId: string) => {
    return axiosClient.patch(`/api/admin/course/publish/${courseId}`);
  },
  rejectCourse: (courseId: number, reason: string) => {
    return axiosClient.patch(`/api/admin/course/rejected/${courseId}`, { rejected_reason: reason });
  },
};

export default CodedraftsAdminCourseApi;
