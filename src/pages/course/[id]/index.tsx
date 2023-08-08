import type { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

import type { GetCourseByIDResponse } from '../../../api/student/course';
import StudentCourseApi from '../../../api/student/course';
import CourseDetailMain from '../../../components/CourseDetailMain';
import StudentAbsoluteCourseInfo from '../../../components/Student/CourseDetail/AbsoluteCourseInfo';
import Footer from '../../../layouts/Footer';
import SessionHeader from '../../../layouts/SessonHeader';

const CourseDetail = ({ course }: { course: GetCourseByIDResponse }) => {
  return (
    <>
      <SessionHeader />
      <CourseDetailMain
        course={course}
        absoluteCourseInfo={<StudentAbsoluteCourseInfo course={course} />}
      />
      <Footer />
    </>
  );
};

export default CourseDetail;

export async function getServerSideProps(context: NextPageContext) {
  const session: any = await getSession(context);

  const { id } = context.query;

  const r = await StudentCourseApi.getById(Number(id), session?.token?.user?.accessToken);

  return {
    props: {
      course: r.data.data,
    },
  };
}
