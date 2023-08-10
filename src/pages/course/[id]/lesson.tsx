import { Checkbox } from '@mantine/core';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import type {
  GetSectionWithLessonByCourseIDResponse,
  StudentGetLessonByID,
} from '../../../api/codedrafts-api';
import { StudentApi } from '../../../api/codedrafts-api';
import type { GetCourseByIDResponse } from '../../../api/student/course';
import ArrowLeftV2Icon from '../../../common/Icons/ArrowLeftV2';
import ArrowRightV2Icon from '../../../common/Icons/ArrowRightV2';
import { PrimaryOutlineButton } from '../../../components/Button';
import { LessonComponent } from '../../../components/LessionComponent';
import LessonTableOfContent from '../../../components/Lesson/LessonTableOfContent';
import LessonSidebar from '../../../components/Lesson/Sidebar/LessonSidebar';
import { requireAuth } from '../../../components/requireAuth';
import HeaderPrimary from '../../../layouts/HeaderPrimary';
import type { LessonComponentProps } from '../../../shared/interface';

const Lesson = () => {
  const router = useRouter();
  const [course, setCourse] = useState<GetCourseByIDResponse>();
  const [sections, setSections] = useState<GetSectionWithLessonByCourseIDResponse[]>([]);
  const [refs, setRefs] = useState<React.MutableRefObject<LessonComponentProps>[]>([]);
  const [isCollapseSidebar, setIsCollapseSidebar] = useState(false);
  const [lesson, setLesson] = useState<StudentGetLessonByID>();
  const [checked, setChecked] = useState(false);

  const fetchCourse = async () => {
    const { id, section_id, lesson_id } = router.query;

    if (!id) return;

    const [res, s] = await Promise.all([
      StudentApi.getCourseById(Number(id)),
      StudentApi.getSectionWithLessonByCourseId(Number(id)),
    ]);
    if (!section_id || !lesson_id) {
      router.replace(
        `/course/${id}/lesson?section_id=${s.data.data[0]?.id}&lesson_id=${s.data.data[0]?.lessons[0]?.id}`,
        undefined,
        { shallow: true },
      );
    }
    setCourse(res.data.data);
    setSections(s.data.data);
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  useEffect(() => {
    if (!router.query.lesson_id || !router.query.id) return;
    const fetch = async () => {
      const l = await StudentApi.getLessonById(
        Number(router.query.lesson_id),
        Number(router.query.id),
      );
      setRefs(
        l.data.data.components.map((e) => {
          const ref: React.MutableRefObject<LessonComponentProps> = React.createRef() as any;
          ref.current = {
            ...e,
          };
          return ref;
        }),
      );
      setLesson(l.data.data);
      setChecked(l.data.data.is_completed);
    };
    fetch();
  }, [router.query.lesson_id]);

  useEffect(() => {
    sections.forEach((s) => {
      s.lessons.forEach((l) => {
        if (l.id === Number(router.query.lesson_id)) {
          l.completed_count = checked ? 1 : 0;
        }
      });
    });

    setSections([...sections]);
  }, [checked]);

  console.log('Rerender Lesson');

  return (
    <>
      <HeaderPrimary />
      <div className="relative flex overflow-hidden">
        <LessonSidebar
          isPreview={true}
          isCollapse={isCollapseSidebar}
          onClickCollapse={() => setIsCollapseSidebar(!isCollapseSidebar)}
          course={course}
          sections={sections}
        />
        <LessonTableOfContent values={refs} />
        <div className="flex h-[calc(100vh-64px)] flex-1 flex-col overflow-y-auto px-[325px] pt-[50px] pb-[200px] font-inter">
          <div className="flex flex-col gap-5">
            <div className="mb-5 flex flex-col gap-5">
              <p className="font-lessonContent text-5xl font-medium ">{lesson?.title}</p>
              <p className="text-lg text-light-text-lessonContent">{lesson?.summary}</p>
            </div>
          </div>
          <div className="mt-4 flex flex-col">
            {refs.map((c, index) => {
              if (!c.current) return null;
              return (
                <LessonComponent
                  isReadOnly={true}
                  index={index}
                  setRefs={setRefs}
                  reference={c}
                  key={index}
                />
              );
            })}
            <div className="my-7 flex w-full justify-end">
              <Checkbox
                checked={checked}
                onChange={async (event) => {
                  StudentApi.markLessonComplete(
                    lesson!.id,
                    course!.id,
                    event.currentTarget.checked,
                  );
                  setChecked(event.currentTarget?.checked);
                }}
                sx={{
                  '& .mantine-Checkbox-input': {
                    borderColor: '#d6d6d6',
                    ':checked': {
                      backgroundColor: '#13cc4a',
                    },
                  },
                }}
                label="Đánh dấu đã hoàn thành"
              />
            </div>
            <div className="flex w-full justify-between">
              {!lesson?.is_first ? (
                <PrimaryOutlineButton
                  onClick={() => {
                    const listLessons = sections?.map((section) => section.lessons).flat();
                    const currentLessonIndex = listLessons?.findIndex((l) => l.id === lesson?.id);
                    const prevLesson = listLessons?.[currentLessonIndex! - 1];
                    router.push(
                      `/course/${course?.id}/lesson?section_id=${prevLesson?.section_id}&lesson_id=${prevLesson?.id}`,
                    );
                  }}
                  text="Quay lại"
                  className="gap-[10px] border-light-text-primary px-[15px] py-[12px]"
                  textClassName="font-semibold text-[13px] text-[#4C4E64]"
                  rightIcon={<ArrowLeftV2Icon width="20px" height="20px" />}
                />
              ) : (
                <div></div>
              )}
              {!lesson?.is_last ? (
                <PrimaryOutlineButton
                  onClick={() => {
                    const listLessons = sections?.map((section) => section.lessons).flat();
                    const currentLessonIndex = listLessons?.findIndex((l) => l.id === lesson?.id);
                    const nextLesson = listLessons?.[currentLessonIndex! + 1];

                    router.push(
                      `/course/${course?.id}/lesson?section_id=${nextLesson?.section_id}&lesson_id=${nextLesson?.id}`,
                    );
                  }}
                  leftIcon={<ArrowRightV2Icon pathFill="#1363DF" width="20px" height="20px" />}
                  textClassName="font-semibold text-[13px]"
                  className="gap-[10px] px-[15px] py-[12px]"
                  text="Tiếp tục"
                />
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = requireAuth(async () => {
  return {
    props: {},
  };
});

export default Lesson;
