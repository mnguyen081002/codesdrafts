import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import Statistical from '@/components/Instructor/Statistical';

import { requireAuth } from '../../components/requireAuth';
import { InstructorLayout } from '../../layouts/Instructor/Instructor';
import ListCoursePage from '../../layouts/Instructor/ListCourse';

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

export const getServerSideProps: GetServerSideProps = requireAuth(async () => {
  return {
    props: {},
  };
});
