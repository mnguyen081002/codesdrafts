import moment from 'moment';
import Link from 'next/link';

import type { ListCourseItemResponse } from '../../api/instructor/course';
import LevelIcon from '../../common/Icons/LevelIcon';
import { CourseStatus } from '../../shared/enum/course';
import { convertTime, formatCoursePrice } from '../../utils/app';

export default function LongCourseCard({
  course,
  onClick,
}: {
  course: ListCourseItemResponse;
  onClick: () => void;
}) {
  const statusMessage = (status: string) => {
    switch (status) {
      case CourseStatus.Published:
        return 'Đã phát hành';
      case CourseStatus.Reviewing:
        return 'Đang chờ duyệt';
      case CourseStatus.Rejected:
        return 'Bị từ chối';
      default:
        return 'Nháp';
    }
  };

  return (
    <tr
      key={course.id}
      className="flex items-center border-b border-light-border py-[15px] pl-[25px] "
    >
      <td className="flex h-full flex-1 gap-[30px]">
        <img
          onClick={onClick}
          className="h-[180px] w-[270px] cursor-pointer rounded-[5px]"
          src={course.thumbnail}
          alt=""
        />
        <div className="flex w-[390px] flex-col items-start justify-between py-[11px] font-lexend-deca">
          <div className="flex flex-col gap-[15px]">
            <p
              onClick={onClick}
              className="cursor-pointer font-lexend-deca text-2xl font-semibold leading-6"
            >
              {course.name}
            </p>
            <div className="flex flex-col">
              <p className="flex gap-2 font-lexend-deca text-sm font-normal text-[#252525]">
                Thời Gian Cập Nhật:
                <span className="font-light tracking-wider text-[#535353]">
                  {moment(course.updated_at).format('HH:mm DD [tháng] MM [năm] YYYY')}
                </span>
              </p>
            </div>
            {course.published_course_id && (
              <div className="flex gap-[10px]">
                <div className="flex items-center gap-[10px]">
                  <img src="/images/icons/published.svg" alt="" className="object-contain" />
                  <p className="text-[#414141]">Đã Phát Hành</p>
                  <Link href={`${process.env.HOST}/course/${course.published_course_id}`}>
                    <p className="text-sm font-normal text-[#747474] underline hover:text-light-text-primary">
                      Xem khóa học đã phát hành
                    </p>
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className="flex w-fit items-center gap-[10px] rounded bg-[#f5f5f5] py-[4px] px-[8px]">
            <img
              src={`/images/icons/${
                course.status === CourseStatus.DraftHasPublishedCourse
                  ? CourseStatus.Draft
                  : course.status
              }.svg`}
              alt=""
              className="object-contain"
            />
            <p className="font-lexend-deca text-xs font-normal capitalize leading-5 text-[#414141]">
              {statusMessage(course.status)}
            </p>
          </div>
        </div>
      </td>
      <td className="flex items-center text-[#3f3f3f]">
        <p className="w-[150px] text-center font-lexend-deca text-lg font-normal leading-6">
          {formatCoursePrice(course.price)}
        </p>
      </td>
      <td>
        <p className="w-[150px] text-center font-lexend-deca text-base font-light leading-6">
          {convertTime(course.reading_time)}
        </p>
      </td>
      <td>
        <div className="flex w-[150px] items-center justify-center gap-3">
          <LevelIcon level={course.level} />
          <p className=" font-lexend-deca text-base font-light leading-6">{course.level}</p>
        </div>
      </td>
    </tr>
  );
}
