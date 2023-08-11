import axiosClient from '../axiosClient';

const CodedraftsAdminLessonApi = {
  getLessonById: (lessonId: number) => {
    return axiosClient.get(`/api/admin/lesson/${lessonId}`);
  },
  getSectionWithLessonByCourseId: (courseId: number, token?: string) => {
    return axiosClient.get(`/api/admin/section/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default CodedraftsAdminLessonApi;
