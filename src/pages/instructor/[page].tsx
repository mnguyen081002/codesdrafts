import { useRouter } from 'next/router';
import React from 'react';

import { InstructorLayout } from '../../layouts/Instructor/Instructor';
import ListCoursePage from '../../layouts/Instructor/ListCourse';

const ManageCourseMain = () => {
  const mapPage = {
    'list-course': <ListCoursePage />,
    students: <div>create-course</div>,
    notification: <div>notification</div>,
  };

  // get query params
  const router = useRouter();

  const { page } = router.query;

  // if query params change, update the page

  return (
    <div className="flex h-[860px] w-[1670px] flex-col gap-[35px] px-[150px] pt-[30px]">
      {mapPage[page as string]}
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
