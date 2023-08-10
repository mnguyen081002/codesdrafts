import axiosClient from '../axiosClient';

const CodedraftsAdminLessonApi = {
  getLessonById: (lessonId: number) => {
    return axiosClient.get(`/api/admin/lesson/${lessonId}`);
  },
  getSectionWithLessonByCourseId: (courseId: number) => {
    return axiosClient.get(`/api/admin/section/${courseId}`);
  },
};

export default CodedraftsAdminLessonApi;
