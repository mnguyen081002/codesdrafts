import type { BaseGetCourseByIDResponse } from '../api/base/interface/course';
import { formatCoursePrice } from '../utils/app';
import CourseInfoInclude from './Student/CourseDetail/CourseInfoInclude';

interface AbsoluteCourseInfoProps<BaseGetCourseByIDResponse> {
  course: BaseGetCourseByIDResponse;
  actionArea: JSX.Element;
}

function AbsoluteCourseInfo(props: AbsoluteCourseInfoProps<BaseGetCourseByIDResponse>) {
  return (
    <div className="absolute top-[142px] right-[128px] flex w-[359px] flex-col rounded-md bg-white px-4 pt-4 pb-10 shadow-md">
      <img
        src={props.course?.thumbnail}
        alt="thumbnail"
        className="mb-10 h-[218px] w-[327px] rounded-[5px]"
      />
      <div className="flex flex-col gap-10 px-5">
        <div className="flex w-[287px] items-center justify-center gap-4">
          <p className={`font-lexend-deca font-bold text-light-text-primary`}>Giá:</p>
          <p
            className={`whitespace-nowrap ${
              props.course.price.toString().length > 6 ? 'text-[22px]' : 'text-2xl'
            } font-lexend-deca  font-bold leading-5 tracking-[0.15px]`}
          >
            {props.course?.price === 0 ? 'Miễn phí' : `${formatCoursePrice(props.course.price)}`}
          </p>
          {props.course?.price !== 0 && props.course?.price !== props.course?.base_price && (
            <p
              className={`font-lexend-deca ${
                props.course.price.toString().length > 6 ? 'text-base' : 'text-lg'
              }font-bold text-light-text-primary line-through`}
            >
              {formatCoursePrice(props.course.base_price)}
            </p>
          )}
        </div>
        {props.actionArea}
        <div className="flex w-full flex-col justify-start gap-[15px]">
          <p className="font-lexend-deca font-semibold uppercase leading-5 text-light-text-primary">
            Khóa học này bao gồm
          </p>
          <CourseInfoInclude title="Thời gian" icon="/images/course/ClockBlue.svg" text="20h 18m" />
          {props.course?.categories.length > 0 && (
            <CourseInfoInclude
              title="Danh mục"
              icon="/images/course/FileBlue.svg"
              text={`${props.course?.categories.map((c) => c.name).join(', ')}`}
            />
          )}
          <CourseInfoInclude
            title="Học viên"
            icon="/images/course/small-group.svg"
            text={`${props.course?.total_enrollment}`}
          />
          <CourseInfoInclude
            title="Cấp độ"
            icon="/images/course/small-level.svg"
            text={`${props.course?.target_audience}`}
          />
          <CourseInfoInclude title="Chia sẻ" icon="/images/course/small-share.svg" />
        </div>
      </div>
    </div>
  );
}

export default AbsoluteCourseInfo;
