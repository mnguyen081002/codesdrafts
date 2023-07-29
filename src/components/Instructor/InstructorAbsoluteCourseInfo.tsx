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
      {[CourseStatus.Draft, CourseStatus.DraftHasPublishedCourse, CourseStatus.Rejected].includes(
        props.course?.status as CourseStatus,
      ) && (
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full flex-col flex-wrap items-center justify-center">
            <p className="text-lg font-medium">
              {props.course?.status === CourseStatus.Rejected
                ? 'Khóa học bị từ chối'
                : 'Đã phát hành'}
            </p>
            {props.course?.status === CourseStatus.Rejected && (
              <p className="break-words text-base font-normal">
                Lý do: {props.course?.rejected_reason.reason}
              </p>
            )}
          </div>
          <PrimaryButton
            onClick={props.submitForReview}
            className="w-full py-[15px]"
            text="GỬI KIỂM DUYỆT"
          />
        </div>
      )}
      {props.course?.status === CourseStatus.Reviewing && (
        <div className="flex items-center justify-center">
          <p className="text-lg font-medium">
            {props.course?.status === CourseStatus.Reviewing && 'Đang chờ kiểm duyệt'}
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
