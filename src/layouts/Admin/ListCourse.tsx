import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import type { AdminCountCourseResponse } from '../../api/admin/setting';
import CodedraftsAdminSettingApi from '../../api/admin/setting';
import type { ListCourseItemResponse } from '../../api/instructor/course';
import LongCourseCard from '../../components/Card/LongCourseCard';
import { UnderlineNavbar } from '../../components/NavBar/UnderlineNavbar';
import { CourseStatus } from '../../shared/enum/course';

const AdminListCoursePage = () => {
  const [listCourse, setListCourse] = useState<ListCourseItemResponse[]>([]);
  const [count, setCount] = useState<AdminCountCourseResponse>();
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;

    const status = router.query.selection as string;
    if (!status) {
      router.replace({ href: './', query: { ...router.query, selection: 'all' } }, undefined, {
        shallow: true,
      });
    }

    const fetch = async () => {
      const res = await CodedraftsAdminSettingApi.getCourses({
        status: status === 'all' ? undefined : status,
      });
      const count = await CodedraftsAdminSettingApi.countCourse();
      setCount(count.data.data);
      setListCourse(res.data.data);
    };
    fetch();
  }, [router.query.selection]);
  return (
    <div className="flex w-[1670px] flex-col gap-[35px] px-[150px] pt-[30px]">
      <div className="flex w-full flex-col gap-[27px] pb-[60px]">
        <UnderlineNavbar
          badge
          navs={[
            {
              title: 'Tất cả',
              slug: 'all',
              badgeNumber: count?.all,
            },
            {
              title: 'Đang chờ duyệt',
              slug: CourseStatus.Reviewing,
              badgeNumber: count?.reviewing,
            },
            {
              title: 'Đã được duyệt',
              slug: CourseStatus.Published,
              badgeNumber: count?.published,
            },
            {
              title: 'Đã bị từ chối',
              slug: CourseStatus.Rejected,
              badgeNumber: count?.rejected,
            },
          ]}
        />
        <div className="flex flex-col rounded-[5px] border border-light-border">
          <table className="table-auto gap-[10px] rounded-[5px] p-[10px]">
            <thead>
              <tr className="flex gap-[80px] border-b border-light-border py-[15px] pl-[25px] pr-[98px] text-base uppercase leading-6 text-[#777]">
                <th className="flex w-[692px] justify-start">
                  <p className="font-medium">KHÓA HỌC</p>
                </th>
                <th className="flex">
                  <p className="w-[150px] text-start font-medium">Giá</p>
                  <p className="w-[150px] text-start font-medium">Thời gian</p>
                  <p className="w-[150px] text-start font-medium">Cấp độ</p>
                </th>
              </tr>
            </thead>
            <tbody className="flex flex-col overflow-y-auto">
              {listCourse.map((course) => (
                <LongCourseCard
                  onClick={() => {
                    router.push({
                      pathname: `./courses/${course.id}`,
                    });
                  }}
                  key={course.id}
                  course={course}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminListCoursePage;
