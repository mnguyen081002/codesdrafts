import type { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { useEffect } from 'react';

import type { GetCourseByIDResponse } from '../../api/student/course';
import StudentCourseApi from '../../api/student/course';
import CourseDetailMain from '../../components/CourseDetailMain';
import { UnderlineNavbar } from '../../components/NavBar/UnderlineNavbar';
import StudentAbsoluteCourseInfo from '../../components/Student/CourseDetail/AbsoluteCourseInfo';
import Footer from '../../layouts/Footer';
import HeaderPrimary from '../../layouts/HeaderPrimary';
import { PATH_AUTH } from '../../routes/path';

type ICourseUrl = {
  id: string;
};

// export const getStaticPaths: GetStaticPaths<ICourseUrl> = async () => {
//   return {
//     paths: [...Array(20)].map((_, index) => ({
//       params: { id: index.toString() },
//     })),
//     fallback: false,
//   };
// };

// export const getStaticProps: GetStaticProps<ICourseUrl, ICourseUrl> = async ({ params }) => {
//   return {
//     props: {
//       id: params!.id,
//     },
//   };
// };

function InstructorCourseUnderlineNavBar() {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const { selection } = router.query;

    if (!selection) {
      router.replace(`${router.asPath}?selection=overview`, undefined, { shallow: true });
    }
  }, [router.query.selection]);
  return (
    <UnderlineNavbar
      navs={[
        {
          title: 'Thông tin khóa học',
          slug: 'overview',
        },
        {
          title: 'Đánh giá',
          className: 'px-[10px]',
          slug: 'review',
        },
      ]}
    />
  );
}

const CourseDetail = ({ course }: { course: GetCourseByIDResponse }) => {
  return (
    <>
      <HeaderPrimary />
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
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: PATH_AUTH.login,
      },
    };
  }

  const { id } = context.query;

  const r = await StudentCourseApi.getById(Number(id));

  return {
    props: {
      course: r.data.data,
    },
  };
}
