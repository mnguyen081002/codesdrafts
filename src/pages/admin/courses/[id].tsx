import type { NextPageContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import CodeSmoothAdminCourseApi from '../../../api/admin/course';
import { CodeSmoothApi } from '../../../api/codesmooth-api';
import type { ListCourseItemResponse } from '../../../api/instructor/course';
import { PrimaryButton, PrimaryOutlineButton } from '../../../components/Button';
import CourseUnderlineNavBar from '../../../components/Instructor/UnderlineNavBar';
import {
  CourseDetailSection,
  CourseDetailSectionTitle,
} from '../../../components/Student/CourseDetail/CourseDetailSection';
import CourseInfoInclude from '../../../components/Student/CourseDetail/CourseInfoInclude';
import CourseSubInfo from '../../../components/Student/CourseDetail/CourseSubInfo';
import { Avatar } from '../../../components/sub/avatar';
import CourseDetailTableOfContent from '../../../components/sub/CourseDetailTableOfContent';
import CustomRating from '../../../components/sub/CustomRating';
import Footer from '../../../layouts/Footer';
import HeaderManage from '../../../layouts/Manage/Header';
import { PATH_AUTH } from '../../../routes/path';
import { CourseStatus } from '../../../shared/enum/course';

const CourseDetail = ({ course: propsCourse }: { course: ListCourseItemResponse }) => {
  const router = useRouter();
  const [course, setCourse] = useState<ListCourseItemResponse>(propsCourse);

  const [id, setId] = useState<string>('');

  const approved = async () => {
    try {
      await CodeSmoothAdminCourseApi.approveCourse(id as string);
      setCourse((pre) => ({ ...pre, status: CourseStatus.Published }));
    } catch (error) {
      // TODO: handle error
      console.log(error);
    }
  };

  const reject = async () => {
    try {
      await CodeSmoothAdminCourseApi.rejectCourse(id as string);
      setCourse((pre) => ({ ...pre, status: CourseStatus.Rejected }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    setId(id as string);
  }, [router.isReady]);

  return (
    <>
      <HeaderManage
        rightContent={
          <Link href={`/admin/courses/${id}/lessons`}>
            <PrimaryOutlineButton
              className="border-none p-0 hover:bg-white"
              textHoverClassName="text-[#013F9E]"
              text="Xem danh sách bài học"
            />
          </Link>
        }
      />
      <div className="h-fit w-full font-lexend-deca">
        <div className="relative flex w-full flex-col justify-start gap-[20px] bg-[#041734] py-[70px] pl-[320px] pr-[560px]">
          <p className="w-fit rounded-3xl bg-[#1CCC19] py-1 px-3 font-lexend-deca font-semibold text-white">
            Graphic Design
          </p>
          <p className="font-lexend-deca text-[46px] font-semibold capitalize text-white">
            {course?.name}
          </p>
          <p className="font-lexend-deca text-lg font-normal text-[#B2BDCD]">
            {course?.short_description}
          </p>
          <div className="flex items-center gap-[25px]">
            <div className="flex items-center gap-[9px]">
              <Avatar url={course?.owner.avatar} w={60} h={60} />
              <div className="flex h-[43px] w-[260px] flex-col justify-start gap-[9px]">
                <p className="font-inter text-2xl font-semibold leading-5 text-white opacity-[87%]">
                  {course?.owner.username}
                </p>
                <p className="font-inter text-lg font-normal leading-5 tracking-[0.15px] text-white opacity-[68%]">
                  Google Expert
                </p>
              </div>
            </div>
            <CourseSubInfo icon="/images/course/File.svg" text="19" />
            <CourseSubInfo icon="/images/course/Clock.svg" text="20h18m" />
            <CourseSubInfo icon="/images/course/People.svg" text="232" />
            <CustomRating />
          </div>
        </div>
        <div className="absolute top-[142px] right-[128px] flex flex-col rounded-md bg-white px-4 pt-4 pb-10 shadow-md">
          <img
            src={course?.thumbnail}
            alt="thumbnail"
            className="mb-10 h-[218px] w-[327px] rounded-[5px]"
          />
          <div className="flex flex-col gap-10 px-5">
            <div className="flex items-center justify-center gap-4">
              <p className="font-lexend-deca text-lg font-bold text-light-text-primary">Giá:</p>
              <p className="font-lexend-deca text-2xl font-bold leading-5 tracking-[0.15px]">
                {course?.price === 0
                  ? 'Miễn phí'
                  : `${course?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VNĐ`}
              </p>
              {course?.price !== 0 && course?.price !== course?.base_price && (
                <p className="font-lexend-deca text-lg font-bold text-light-text-primary line-through">
                  {course?.base_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                </p>
              )}
            </div>
            {course?.status === CourseStatus.Reviewing && (
              <div className="flex w-full flex-col gap-1">
                <PrimaryButton onClick={approved} className="py-[15px]" text="Duyệt khóa học" />
                <PrimaryOutlineButton
                  onClick={reject}
                  className="py-[15px]"
                  text="Từ chối khóa học"
                />
              </div>
            )}
            {course?.status === CourseStatus.Published && (
              <PrimaryOutlineButton onClick={reject} className="py-[15px]" text="Ngưng phát hành" />
            )}
            {course?.status === CourseStatus.Rejected && (
              <div className="flex items-center justify-center">
                <p className="text-lg font-medium">Đã phát hành</p>
              </div>
            )}
            <div className="flex w-full flex-col justify-start gap-[15px]">
              <p className="font-lexend-deca font-semibold uppercase leading-5 text-light-text-primary">
                Khóa học này bao gồm
              </p>
              <CourseInfoInclude
                title="Thời gian"
                icon="/images/course/ClockBlue.svg"
                text="20h 18m"
              />
              <CourseInfoInclude
                title="Danh mục"
                icon="/images/course/FileBlue.svg"
                text={`${course?.categories.map((c) => c.name).join(', ')}`}
              />
              <CourseInfoInclude
                title="Học viên"
                icon="/images/course/small-group.svg"
                text={`${course?.total_enrollment}`}
              />
              <CourseInfoInclude
                title="Cấp độ"
                icon="/images/course/small-level.svg"
                text={`${course?.target_audience}`}
              />
              <CourseInfoInclude title="Chia sẻ" icon="/images/course/small-share.svg" />
            </div>
          </div>
        </div>
        <div className="ml-[320px] flex w-[1000px] flex-col items-start gap-7 py-[70px]">
          <CourseUnderlineNavBar />
          <p className="font-lexend-deca text-base font-light leading-8 text-light-text-primary">
            {course?.description}
          </p>
          <CourseDetailSection
            contents={course?.objectives}
            title="Bạn sẽ học được gì?"
            text="This tutorial will help you learn quickly and thoroughly. Lorem ipsum, or lipsum as it is
        sometimes known, iaws dumm text used in laying out print, graphic or web designsm dolor sit
        amet."
          />
          <CourseDetailSection
            contents={course?.requirements}
            title="Yêu cầu"
            text="Cần một số yêu cầu cần thiết để bạn có thể hoàn thành khóa học này."
          />
          <CourseDetailSectionTitle title={'Nội dung giảng dạy'} text={''} noUnderline />
          <CourseDetailTableOfContent
            data={[
              {
                title: '1. Giới thiệu khóa học',
                contents: [
                  'Figma là gì?',
                  'Các thành phần trong Figma',
                  'Giao diện Figma',
                  'Những lưu ý khi sử dụng Figma',
                  'Hướng dẫn cài đặt Figma',
                  'Thiết lập tài khoản Figma',
                  'Quy trình làm việc với Figma',
                  'Case study',
                  'Kết luận',
                ],
              },
              {
                title: '1. Giới thiệu khóa học',
                contents: [
                  'Figma là gì?',
                  'Các thành phần trong Figma',
                  'Giao diện Figma',
                  'Những lưu ý khi sử dụng Figma',
                  'Hướng dẫn cài đặt Figma',
                  'Thiết lập tài khoản Figma',
                  'Quy trình làm việc với Figma',
                  'Case study',
                  'Kết luận',
                ],
              },
            ]}
          />
          <CourseDetailSectionTitle title={'Tác giả'} text={''} className="mt-8" />
          <div className="flex h-[220px] justify-start gap-6">
            <img className="h-[220px] w-[220px]" src={course?.owner.avatar} alt="" />
            <div className="flex w-[576px] flex-col justify-start gap-2">
              <div className="flex flex-col items-start gap-1">
                <p className="font-lexend-deca text-[22px] font-medium leading-[22px] text-black">
                  {course?.owner.username}
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
              <PrimaryOutlineButton text="Xem thêm" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseDetail;

export async function getServerSideProps(context: NextPageContext) {
  const session: any = await getSession(context);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: PATH_AUTH.login,
      },
    };
  }

  const { id } = context.query;
  try {
    const r = await CodeSmoothApi.Instructor.Course.getCourseById(
      Number(id),
      session.token.user.accessToken,
    );

    return {
      props: {
        course: r.data.data,
        session: null,
      },
    };
  } catch (error) {
    console.log('!!!!!!!!!!!!!!!!', error);
  }
  return {
    props: {
      session: null,
    },
  };
}