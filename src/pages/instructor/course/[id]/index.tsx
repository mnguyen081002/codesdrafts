import type { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { useState } from 'react';

import type { GetCourseByIDResponse } from '../../../../api/instructor/course';
import CodedraftsInstructorCourseApi from '../../../../api/instructor/course';
import CodedraftsInstructorSectionApi from '../../../../api/instructor/section';
import CourseDetailMain from '../../../../components/CourseDetailMain';
import InstructorAbsoluteCourseInfo from '../../../../components/Instructor/InstructorAbsoluteCourseInfo';
import Footer from '../../../../layouts/Footer';
import { HeaderInstructor } from '../../../../layouts/Instructor/Instructor';
import { PATH_AUTH } from '../../../../routes/path';
import { CourseStatus } from '../../../../shared/enum/course';

const CourseDetail = ({ course: propsCourse }: { course: GetCourseByIDResponse }) => {
  const router = useRouter();
  const [course, setCourse] = useState<GetCourseByIDResponse>(propsCourse);
  const submitForReview = async () => {
    if (!router.isReady) return;
    const { id } = router.query;

    try {
      await CodedraftsInstructorCourseApi.submitForReview(Number(id));
      setCourse((pre) => ({ ...pre, status: CourseStatus.Reviewing }));
    } catch (error) {
      // TODO: handle error
      console.log(error);
    }
  };

  return (
    <>
      <HeaderInstructor showAvatar />
      <CourseDetailMain
        course={course}
        absoluteCourseInfo={
          <InstructorAbsoluteCourseInfo course={course} submitForReview={submitForReview} />
        }
      />
      <Footer />
    </>
  );
};

export default CourseDetail;

export async function getServerSideProps(context: NextPageContext) {
  const session: any = await getSession(context);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: PATH_AUTH.login,
      },
    };
  }

  const { id } = context.query;
  try {
    const [r, s] = await Promise.all([
      CodedraftsInstructorCourseApi.getCourseById(Number(id), session.token.user.accessToken),
      CodedraftsInstructorSectionApi.getSectionsWithLessonByCourseId(
        Number(id),
        session.token.user.accessToken,
      ),
    ]);

    return {
      props: {
        course: {
          ...r.data.data,
          sections: s.data.data,
        },
      },
    };
  } catch (error) {
    console.log('!!!!!!!!!!!!!!!!', error);
  }
  return {
    props: {},
  };
}
