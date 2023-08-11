import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import type { NextPageContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import CodedraftsAdminCourseApi from '../../../../api/admin/course';
import CodedraftsAdminLessonApi from '../../../../api/admin/lesson';
import type { GetCourseByIDResponse } from '../../../../api/instructor/course';
import AbsoluteCourseInfo from '../../../../components/AbsoluteCourseInfo';
import { PrimaryButton, PrimaryOutlineButton } from '../../../../components/Button';
import CourseDetailMain from '../../../../components/CourseDetailMain';
import Footer from '../../../../layouts/Footer';
import HeaderManage from '../../../../layouts/Manage/Header';
import { PATH_AUTH } from '../../../../routes/path';
import { CourseStatus } from '../../../../shared/enum/course';
import { toastGetErrorMessage } from '../../../../utils/app';

const CourseDetail = ({ course: propsCourse }: { course: GetCourseByIDResponse }) => {
  const router = useRouter();
  const [course, setCourse] = useState<GetCourseByIDResponse>(propsCourse);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [id, setId] = useState<string>('');
  const [opened, { open, close }] = useDisclosure(false);
  const [reason, setReason] = useState<string>('');

  const approved = async () => {
    setIsLoading(true);
    await toast.promise(CodedraftsAdminCourseApi.approveCourse(id as string), {
      pending: 'Đang phát hành khóa học',
      success: 'Phát hành khóa học thành công',
      error: {
        render({ data }) {
          return <div>{toastGetErrorMessage(data)}</div>;
        },
      },
    });
    setCourse((pre) => ({ ...pre, status: CourseStatus.Published }));
    setIsLoading(false);
  };

  const reject = async () => {
    open();
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
      <Modal opened={opened} onClose={close} title="Lý do từ chối" centered>
        <div className="flex flex-col gap-2">
          <textarea
            className="h-40 w-full resize-none rounded-md border border-light-border p-2 focus:outline-none"
            placeholder="Lý do từ chối"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <PrimaryOutlineButton text="Hủy" onClick={close} />
            <PrimaryButton
              text="Gửi"
              onClick={async () => {
                setIsLoading(true);
                setCourse((pre) => ({ ...pre, status: CourseStatus.Rejected }));
                await toast.promise(CodedraftsAdminCourseApi.rejectCourse(Number(id), reason), {
                  pending: 'Đang từ chối khóa học',
                  success: 'Từ chối khóa học thành công',
                  error: {
                    render({ data }) {
                      return <div>{toastGetErrorMessage(data)}</div>;
                    },
                  },
                });
                setIsLoading(false);
                close();
              }}
            />
          </div>
        </div>
      </Modal>
      <CourseDetailMain
        course={course}
        absoluteCourseInfo={
          <AbsoluteCourseInfo
            course={course}
            actionArea={
              <>
                {course?.status === CourseStatus.Reviewing && (
                  <div className="flex w-full flex-col gap-1">
                    <PrimaryButton onClick={approved} className="py-[15px]" text="Duyệt khóa học" />
                    <PrimaryOutlineButton
                      onClick={reject}
                      className="py-[15px]"
                      text="Từ chối khóa học"
                      disabled={isLoading}
                    />
                  </div>
                )}
                {course?.status === CourseStatus.Published && (
                  <PrimaryOutlineButton
                    onClick={reject}
                    className="py-[15px]"
                    text="Ngưng phát hành"
                    disabled={isLoading}
                  />
                )}
                {course?.status === CourseStatus.Rejected && (
                  <div className="flex w-full flex-col flex-wrap items-center justify-center">
                    <p className="text-lg font-medium">Đã từ chối</p>
                    {course?.status === CourseStatus.Rejected && (
                      <p className="break-words text-base font-normal">
                        Lý do: {course?.rejected_reason.reason}
                      </p>
                    )}
                  </div>
                )}
              </>
            }
          />
        }
      />
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
    const [r, s] = await Promise.all([
      CodedraftsAdminCourseApi.getCourseById(Number(id), session.token.user.accessToken),
      CodedraftsAdminLessonApi.getSectionWithLessonByCourseId(
        Number(id),
        session.token.user.accessToken,
      ),
    ]);

    return {
      props: {
        course: {
          ...r.data.data,
          sections: s.data.data,
        },
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
