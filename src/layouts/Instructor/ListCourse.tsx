import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import type {
  InstructorCountCourseResponse,
  ListCourseItemResponse,
} from '../../api/instructor/course';
import CodedraftsInstructorCourseApi from '../../api/instructor/course';
import LongCourseCard from '../../components/Card/LongCourseCard';
import { UnderlineNavbar } from '../../components/NavBar/UnderlineNavbar';
import { TOAST_CONFIG } from '../../shared/constants/app';
import { CourseStatus } from '../../shared/enum/course';
import { toastGetErrorMessage } from '../../utils/app';

const ListCoursePage = () => {
  const [listCourse, setListCourse] = useState<ListCourseItemResponse[]>([]);
  const [count, setCount] = useState<InstructorCountCourseResponse>();
  const [isLoading, setIsLoading] = useState(false);
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
      try {
        setIsLoading(true);
        const [res, count] = await Promise.all([
          CodedraftsInstructorCourseApi.listCourse({
            status: status === 'all' ? undefined : status,
          }),
          CodedraftsInstructorCourseApi.countCourse(),
        ]);
        setCount(count.data.data);
        setListCourse(res.data.data);
      } catch (error) {
        toast.error(toastGetErrorMessage(error), TOAST_CONFIG);
      }
      setIsLoading(false);
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
              badgeNumber: count?.all,
            },
            {
              title: 'Nháp',
              slug: CourseStatus.Draft,
              badgeNumber: count?.draft,
            },
            {
              title: 'Đang chờ duyệt',
              slug: CourseStatus.Reviewing,
              badgeNumber: count?.reviewing,
            },
            {
              title: 'Đã phát hành',
              slug: CourseStatus.Published,
              badgeNumber: count?.published,
            },
            {
              title: 'Bị từ chối',
              slug: CourseStatus.Rejected,
              badgeNumber: count?.rejected,
            },
          ]}
        />
        <div className="flex flex-col rounded-[5px] border border-light-border">
          <table className="table-auto gap-[10px] rounded-[5px] p-[10px]">
            <thead>
              <tr className="flex border-b border-light-border py-[15px] pl-[25px] text-base uppercase leading-6 text-[#777]">
                <th className="flex flex-1 justify-start">
                  <p className="font-medium">KHÓA HỌC</p>
                </th>
                <th className="flex">
                  <p className="w-[150px] text-center font-medium">Giá</p>
                </th>
                <th className="flex">
                  <p className="w-[150px] text-center font-medium">Thời gian</p>
                </th>
                <th className="flex">
                  <p className="w-[150px] text-center font-medium">Cấp độ</p>
                </th>
              </tr>
            </thead>
            <tbody className="flex max-h-[580px] flex-col overflow-y-auto">
              {isLoading ? (
                <tr className="flex h-[200px] items-center justify-center">
                  <td className="text-xl font-semibold">Đang tải dữ liệu</td>
                </tr>
              ) : (
                <>
                  {listCourse.length === 0 && (
                    <tr className="flex h-[200px] items-center justify-center">
                      <td className="text-xl font-semibold">Không có khóa học nào</td>
                    </tr>
                  )}
                  {listCourse.map((course) => (
                    <LongCourseCard
                      onClick={() => {
                        router.push({
                          pathname: `./course/course-editor`,
                          query: { id: course.id },
                        });
                      }}
                      key={course.id}
                      course={course}
                    />
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ListCoursePage;
