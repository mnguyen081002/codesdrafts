import type { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import React from 'react';

import Statistical from '@/components/Instructor/Statistical';

import { InstructorLayout } from '../../layouts/Instructor/Instructor';
import ListCoursePage from '../../layouts/Instructor/ListCourse';
import { PATH_AUTH } from '../../routes/path';

const ManageCourseMain = () => {
  const mapPage = {
    course: <ListCoursePage />,
    students: <div>create-course</div>,
    notification: <div>notification</div>,
    statistical: <Statistical />,
  };

  // get query params
  const router = useRouter();

  const { slug } = router.query;

  // if query params change, update the page

  return (
    <div className="flex h-[860px] w-[1670px] flex-col gap-[35px] px-[120px] pt-[30px]">
      {mapPage[slug as string]}
    </div>
  );
};

const ManageCourse = () => {
  return (
    <InstructorLayout>
      <ManageCourseMain />
    </InstructorLayout>
  );
};

export default ManageCourse;

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
  return {
    props: {
      session: null,
    },
  };
}
