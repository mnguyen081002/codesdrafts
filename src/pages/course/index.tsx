import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { CodedraftsApi } from '../../api/codedrafts-api';
import type { ListCourseItemResponse } from '../../api/instructor/course';
import LongCourseCard from '../../components/Card/LongCourseCard';
import { UnderlineNavbar } from '../../components/NavBar/UnderlineNavbar';
import Footer from '../../layouts/Footer';
import HeaderPrimary from '../../layouts/HeaderPrimary';

const ListCoursePage = () => {
  const [listCourse, setListCourse] = useState<ListCourseItemResponse[]>([]);
  const router = useRouter();
  useEffect(() => {
    const slug = router.query.selection as string;
    if (!slug) {
      router.push({
        pathname: './course',
        query: {
          selection: 'all',
        },
      });
    }
    const fetch = async () => {
      const res = await CodedraftsApi.getMyCourseList({});

      setListCourse(res.data.data);
    };
    fetch();
  }, [router.query.selection]);
  return (
    <>
      <HeaderPrimary />

      <div className="flex w-full justify-center">
        <div className="flex w-[1670px] flex-col gap-[35px] px-[150px] pt-[30px]">
          <p className="w-full font-lexend-deca text-4xl font-semibold">Khóa học của tôi</p>
          <div className="flex w-full flex-col gap-[27px] pb-[60px]">
            <UnderlineNavbar
              badge
              navs={[
                {
                  title: 'Tất cả',
                  slug: 'all',
                  badgeNumber: 1,
                },
                {
                  title: 'Yêu thích',
                  slug: 'favorite',
                  badgeNumber: 1,
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
                          pathname: `course/${course.id}`,
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
      </div>

      <Footer />
    </>
  );
};

export default ListCoursePage;
