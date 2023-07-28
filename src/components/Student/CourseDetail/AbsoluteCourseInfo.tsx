import router from 'next/router';

import type { GetCourseByIDResponse } from '../../../api/student/course';
import { PATH_DASHBOARD } from '../../../routes/path';
import AbsoluteCourseInfo from '../../AbsoluteCourseInfo';
import { PrimaryButton } from '../../Button';

interface StudentAbsoluteCourseInfoProps {
  course: GetCourseByIDResponse;
}

function StudentAbsoluteCourseInfo(props: StudentAbsoluteCourseInfoProps) {
  return (
    <AbsoluteCourseInfo
      course={props.course}
      actionArea={
        <PrimaryButton
          className="py-[15px]"
          text="ĐĂNG KÝ NGAY"
          onClick={() => {
            router.push({
              pathname: `/${PATH_DASHBOARD.PAYMENT}`,
              query: {
                id: props.course.id,
              },
            });
          }}
        />
      }
    />
  );
}

export default StudentAbsoluteCourseInfo;
