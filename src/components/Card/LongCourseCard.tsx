import moment from 'moment';

import type { ListCourseItemResponse } from '../../api/instructor/course';
import { CourseStatus } from '../../shared/enum/course';

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
      // href={`./course/${course.id}`}
      onClick={onClick}
      className="flex cursor-pointer items-center gap-[80px] border-b border-light-border py-[15px] pl-[25px] pr-[98px]"
    >
      <td className="flex h-full gap-[30px]">
        <img
          className="h-[180px] w-[270px] rounded-[5px]"
          src="/images/course/Thumnail.png"
          alt=""
        />
        <div className="flex w-[390px] flex-col items-start justify-between py-[11px]">
          <div className="flex flex-col gap-[15px]">
            <p className="font-lexend-deca text-2xl font-semibold leading-6">{course.name}</p>
            <p className="flex gap-2 font-lexend-deca text-sm font-normal text-[#252525]">
              Thời Gian Cập Nhật:
              <span className="font-light tracking-wider text-[#535353]">
                {moment(course.updated_at).format('HH:mm DD [tháng] MM [năm] YYYY')}
              </span>
            </p>
          </div>
          <div className="flex w-fit items-center gap-[10px] rounded bg-[#f5f5f5] py-[4px] px-[8px]">
            <img src={`/images/icons/${course.status}.svg`} alt="" className="object-contain" />
            <p className="font-lexend-deca text-xs font-normal capitalize leading-5 text-[#747474]">
              {statusMessage(course.status)}
            </p>
          </div>
        </div>
      </td>
      <td className="flex items-center text-[#3f3f3f]">
        <p className="w-[150px] font-lexend-deca text-lg font-normal leading-6">
          {course.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VNĐ
        </p>
        <p className="w-[150px] font-lexend-deca text-base font-light leading-6">3d20h11m</p>
        <p className="w-[150px] font-lexend-deca text-base font-light leading-6">
          {course.target_audience}
        </p>
      </td>
    </tr>
  );
}
