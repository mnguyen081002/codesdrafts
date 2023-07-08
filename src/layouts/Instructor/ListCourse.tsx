import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { CodeSmoothApi } from '../../api/codesmooth-api';
import type { ListCourseItemResponse } from '../../api/instructor/course';
import LongCourseCard from '../../components/Card/LongCourseCard';
import { UnderlineNavbar } from '../../components/NavBar/UnderlineNavbar';
import { CourseStatus } from '../../shared/enum/course';

const ListCoursePage = () => {
  const [listCourse, setListCourse] = useState<ListCourseItemResponse[]>([]);
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
      const res = await CodeSmoothApi.Instructor.Course.listCourse({
        status: status === 'all' ? undefined : status,
      });
      setListCourse(res.data.data);
    };
    fetch();
  }, [router.query.selection]);
  return (
    <>
      <p className="w-full font-lexend-deca text-4xl font-semibold">Khóa học của tôi</p>
      <div className="flex w-full flex-col gap-[27px] pb-[60px]">
        <UnderlineNavbar
          badge
          isInstructor={true}
          navs={[
            {
              title: 'Tất cả',
              slug: 'all',
            },
            {
              title: 'Nháp',
              slug: CourseStatus.Draft,
            },
            {
              title: 'Đang chờ duyệt',
              slug: CourseStatus.Reviewing,
            },
            {
              title: 'Đã được duyệt',
              slug: CourseStatus.Published,
            },
            {
              title: 'Bị từ chối',
              slug: CourseStatus.Rejected,
            },
          ]}
        />
        <div className="flex flex-col rounded-[5px] border border-light-border">
          <div className="flex justify-between border-b border-light-border py-[15px] pl-[25px] pr-[110px] text-base font-medium uppercase leading-6 text-[#777]">
            <p>KHÓA HỌC</p>
            <div className="flex gap-[100px]">
              <p>Giá</p>
              <p>Thời gian</p>
              <p>Cấp độ</p>
            </div>
          </div>
          <div className="max-h-[580px] overflow-y-scroll">
            {listCourse.map((course) => (
              <LongCourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListCoursePage;
