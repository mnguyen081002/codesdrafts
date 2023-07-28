import type { NextPageContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import CodeSmoothAdminCourseApi from '../../../api/admin/course';
import { CodeSmoothApi } from '../../../api/codesmooth-api';
import type { GetCourseByIDResponse } from '../../../api/instructor/course';
import AbsoluteCourseInfo from '../../../components/AbsoluteCourseInfo';
import { PrimaryButton, PrimaryOutlineButton } from '../../../components/Button';
import CourseDetailMain from '../../../components/CourseDetailMain';
import Footer from '../../../layouts/Footer';
import HeaderManage from '../../../layouts/Manage/Header';
import { PATH_AUTH } from '../../../routes/path';
import { CourseStatus } from '../../../shared/enum/course';

const CourseDetail = ({ course: propsCourse }: { course: GetCourseByIDResponse }) => {
  const router = useRouter();
  const [course, setCourse] = useState<GetCourseByIDResponse>(propsCourse);

  const [id, setId] = useState<string>('');

  const approved = async () => {
    try {
      await CodeSmoothAdminCourseApi.approveCourse(id as string);
      setCourse((pre) => ({ ...pre, status: CourseStatus.Published }));
    } catch (error) {
      // TODO: handle error
      console.log(error);
    }
  };

  const reject = async () => {
    try {
      await CodeSmoothAdminCourseApi.rejectCourse(id as string);
      setCourse((pre) => ({ ...pre, status: CourseStatus.Rejected }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    setId(id as string);
  }, [router.isReady]);

  return (
    <>
      <HeaderManage
        rightContent={
          <Link href={`/admin/courses/${id}/lessons`}>
            <PrimaryOutlineButton
              className="border-none p-0 hover:bg-white"
              textHoverClassName="text-[#013F9E]"
              text="Xem danh sách bài học"
            />
          </Link>
        }
      />
      <CourseDetailMain
        course={course}
        absoluteCourseInfo={
          <AbsoluteCourseInfo
            course={course}
            actionArea={
              <>
                {course?.status === CourseStatus.Reviewing && (
                  <div className="flex w-full flex-col gap-1">
                    <PrimaryButton onClick={approved} className="py-[15px]" text="Duyệt khóa học" />
                    <PrimaryOutlineButton
                      onClick={reject}
                      className="py-[15px]"
                      text="Từ chối khóa học"
                    />
                  </div>
                )}
                {course?.status === CourseStatus.Published && (
                  <PrimaryOutlineButton
                    onClick={reject}
                    className="py-[15px]"
                    text="Ngưng phát hành"
                  />
                )}
                {course?.status === CourseStatus.Rejected && (
                  <div className="flex items-center justify-center">
                    <p className="text-lg font-medium">Đã phát hành</p>
                  </div>
                )}
              </>
            }
          />
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
    const r = await CodeSmoothApi.Instructor.Course.getCourseById(
      Number(id),
      session.token.user.accessToken,
    );

    return {
      props: {
        course: r.data.data,
        session: null,
      },
    };
  } catch (error) {
    console.log('!!!!!!!!!!!!!!!!', error);
  }
  return {
    props: {
      session: null,
    },
  };
}
