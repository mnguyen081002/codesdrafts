import type { GetCourseByIDResponse } from '../../api/instructor/course';
import { CourseStatus } from '../../shared/enum/course';
import AbsoluteCourseInfo from '../AbsoluteCourseInfo';
import { PrimaryButton } from '../Button';

interface InstructorCourseInfoActionAreaProps {
  course: GetCourseByIDResponse;
  submitForReview: () => void;
}

function InstructorCourseInfoActionArea(props: InstructorCourseInfoActionAreaProps) {
  return (
    <>
      {props.course?.status === CourseStatus.Draft ||
      (props.course?.status === CourseStatus.Published && props.course?.published_course_id) ? (
        <PrimaryButton
          onClick={props.submitForReview}
          className="py-[15px]"
          text="GỬI KIỂM DUYỆT"
        />
      ) : (
        <div className="flex items-center justify-center">
          <p className="text-lg font-medium">
            {props.course?.status === CourseStatus.Reviewing
              ? 'Đang chờ kiểm duyệt'
              : 'Đã phát hành'}
          </p>
        </div>
      )}
    </>
  );
}

interface InstructorAbsoluteCourseInfoProps {
  course: GetCourseByIDResponse;
  submitForReview: () => void;
}

function InstructorAbsoluteCourseInfo(props: InstructorAbsoluteCourseInfoProps) {
  return (
    <AbsoluteCourseInfo
      course={props.course}
      actionArea={
        <InstructorCourseInfoActionArea
          course={props.course}
          submitForReview={props.submitForReview}
        />
      }
    />
  );
}

export default InstructorAbsoluteCourseInfo;
