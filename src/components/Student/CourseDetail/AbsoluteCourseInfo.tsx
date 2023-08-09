import router from 'next/router';

import type { GetCourseByIDResponse } from '../../../api/student/course';
import { PATH_DASHBOARD } from '../../../routes/path';
import AbsoluteCourseInfo from '../../AbsoluteCourseInfo';
import { PrimaryButton, PrimaryOutlineButton } from '../../Button';

interface StudentAbsoluteCourseInfoProps {
  course: GetCourseByIDResponse;
}

function StudentAbsoluteCourseInfo(props: StudentAbsoluteCourseInfoProps) {
  return (
    <AbsoluteCourseInfo
      course={props.course}
      actionArea={
        !props.course.is_bought ? (
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
        ) : (
          <PrimaryOutlineButton
            className="py-[15px]"
            text="VÀO HỌC NGAY"
            onClick={() => {
              router.push({
                pathname: `./${props.course.id}/lesson`,
              });
            }}
          />
        )
      }
    />
  );
}

export default StudentAbsoluteCourseInfo;
