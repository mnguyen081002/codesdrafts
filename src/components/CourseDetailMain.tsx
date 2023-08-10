import { convertTime } from '@/utils/app';

import type { BaseGetCourseByIDResponse } from '../api/base/interface/course';
import { PrimaryOutlineButton } from './Button';
import CourseUnderlineNavBar from './Instructor/UnderlineNavBar';
import {
  CourseDetailSection,
  CourseDetailSectionTitle,
} from './Student/CourseDetail/CourseDetailSection';
import CourseSubInfo from './Student/CourseDetail/CourseSubInfo';
import { Avatar } from './sub/avatar';
import CourseDetailTableOfContent from './sub/CourseDetailTableOfContent';
import CustomRating from './sub/CustomRating';

interface CourseDetailMainProps {
  course: BaseGetCourseByIDResponse;
  absoluteCourseInfo: React.ReactNode;
}

function CourseDetailMain(props: CourseDetailMainProps) {
  return (
    <div className="h-fit w-full font-lexend-deca">
      <div className="relative flex w-full flex-col justify-start gap-[20px] bg-[#041734] py-[70px] pl-[320px] pr-[560px]">
        <p className="w-fit rounded-3xl bg-[#1CCC19] py-1 px-3 font-lexend-deca font-semibold text-white">
          {props.course?.main_category.name}
        </p>
        <p className="font-lexend-deca text-[46px] font-semibold capitalize text-white">
          {props.course?.name}
        </p>
        <p className="font-lexend-deca text-lg font-normal text-[#B2BDCD]">
          {props.course?.short_description}
        </p>
        <div className="flex items-center gap-[25px]">
          <div className="flex items-center gap-[9px]">
            <Avatar url={props.course?.owner.avatar} w={60} h={60} />
            <div className="flex h-[43px] w-[260px] flex-col justify-start gap-[9px]">
              <p className="font-inter text-2xl font-semibold leading-5 text-white opacity-[87%]">
                {props.course?.owner.username}
              </p>
              <p className="font-inter text-lg font-normal leading-5 tracking-[0.15px] text-white opacity-[68%]">
                Google Expert
              </p>
            </div>
          </div>
          <CourseSubInfo icon="/images/course/File.svg" text="19" />
          <CourseSubInfo
            icon="/images/course/Clock.svg"
            text={convertTime(props.course?.reading_time)}
          />
          <CourseSubInfo
            icon="/images/course/People.svg"
            text={props.course.total_enrollment.toString()}
          />
          <CustomRating />
        </div>
      </div>
      {props.absoluteCourseInfo}
      <div className="ml-[320px] flex w-[1000px] flex-col items-start gap-7 py-[70px]">
        <CourseUnderlineNavBar />
        <p className="font-lexend-deca text-base font-light leading-8 text-light-text-primary">
          {props.course?.description}
        </p>
        <CourseDetailSection
          contents={props.course?.objectives}
          title="Bạn sẽ học được gì?"
          text="Trong khóa học này bạn sẽ học được những kiến thức và kỹ năng sau."
        />
        <CourseDetailSection
          contents={props.course?.requirements}
          title="Yêu cầu"
          text="Cần một số yêu cầu cần thiết để bạn có thể hoàn thành khóa học này."
        />
        <CourseDetailSectionTitle title={'Nội dung giảng dạy'} text={''} noUnderline />
        <CourseDetailTableOfContent
          data={props.course.sections.map((s) => {
            return {
              title: s.title,
              contents: s.lessons.map((l) => {
                return l.title;
              }),
            };
          })}
        />
        <CourseDetailSectionTitle title={'Tác giả'} text={''} className="mt-8" />
        <div className="flex h-[220px] justify-start gap-6">
          <img className="h-[220px] w-[220px]" src={props.course?.owner.avatar} alt="" />
          <div className="flex w-[576px] flex-col justify-start gap-2">
            <div className="flex flex-col items-start gap-1">
              <p className="font-lexend-deca text-[22px] font-medium leading-[22px] text-black">
                {props.course?.owner.username}
              </p>
              <p className="font-lexend-deca font-light leading-[22px] text-[#5C5C5C]">
                Google UX Designer
              </p>
            </div>
            <div className="flex items-center gap-[10px]">
              <img src="/images/course/small-group.svg" alt="" />
              <p className="font-lexend-deca text-base font-light leading-[20px] text-[#5C5C5C]">
                232 Học viên
              </p>
              <CustomRating
                average={{
                  color: '5C5C5C',
                  value: 4.5,
                }}
              />
            </div>
            <div className="h-[1px] w-full bg-light-border" />
            <p className="py-2">
              Donald Logan has more than 15 years’ experience as a project management consultant,
              educator, technology consultant, business know.
            </p>
            <PrimaryOutlineButton className="w-[174px]" text="Xem thêm" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetailMain;
