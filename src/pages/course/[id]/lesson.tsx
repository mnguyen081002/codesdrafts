import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { CodedraftsApi } from '../../../api/codedrafts-api';
import type { GetLessonResponse } from '../../../api/instructor/lesson';
import type { GetCourseByIDResponse } from '../../../api/student/course';
import { LessonComponent } from '../../../components/LessionComponent';
import LessonTableOfContent from '../../../components/Lesson/LessonTableOfContent';
import LessonSidebar from '../../../components/Lesson/Sidebar/LessonSidebar';
import { requireAuth } from '../../../components/requireAuth';
import HeaderPrimary from '../../../layouts/HeaderPrimary';
import { ComponentType } from '../../../shared/enum/component';
import type { LessonComponentProps } from '../../../shared/interface';

const Lesson = () => {
  const router = useRouter();
  const [course, setCourse] = useState<GetCourseByIDResponse>();
  const [refs, setRefs] = useState<React.MutableRefObject<LessonComponentProps>[]>([]);
  const [isCollapseSidebar, setIsCollapseSidebar] = useState(false);
  const [lesson, setLesson] = useState<GetLessonResponse>();

  const fetchCourse = async () => {
    if (!router.query.id) return;

    const { id, section_id, lesson_id } = router.query;
    const res = await CodedraftsApi.getCourseById(Number(id));
    if (!section_id) {
      router.replace(
        `/course/${id}/lesson?section_id=${res.data.data.sections[0]?.id}&lesson_id=${res.data.data.sections[0]?.lessons[0]?.id}`,
        undefined,
        { shallow: true },
      );
      return;
    }
    setCourse(res.data.data);
    const l = await CodedraftsApi.getLessonById(Number(lesson_id));
    setLesson(l.data.data);
    setRefs(
      l.data.data.components.map((e) => {
        const ref: React.MutableRefObject<LessonComponentProps> = React.createRef() as any;
        ref.current = {
          ...e,
        };
        return ref;
      }),
    );
  };

  useEffect(() => {
    fetchCourse();
  }, [router.query.id, router.query.lesson_id]);
  return (
    <>
      <HeaderPrimary />
      <div className="relative flex overflow-hidden">
        <LessonSidebar
          isPreview={true}
          isCollapse={isCollapseSidebar}
          onClickCollapse={() => setIsCollapseSidebar(!isCollapseSidebar)}
          course={course}
        />
        <LessonTableOfContent values={refs} />
        <div className="flex h-[calc(100vh-64px)] flex-1 flex-col overflow-y-auto px-[325px] pt-[50px] pb-[200px] font-inter">
          <div className="flex flex-col gap-5">
            <div className="mb-5 flex flex-col gap-5">
              <p className="font-lessonContent text-6xl font-medium ">{lesson?.title}</p>
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
            <div
              className="h-[50px] cursor-text"
              onClick={() => {
                const lastRef = refs[refs.length - 1];
                if (
                  lastRef?.current.type === ComponentType.Text &&
                  (lastRef.current.content as any).html === '<p></p>'
                )
                  return;

                const ref: React.MutableRefObject<LessonComponentProps> = React.createRef() as any;
                ref.current = {
                  type: ComponentType.Text,
                  content: {
                    html: '',
                  },
                };

                setRefs([...refs, ref]);
              }}
            ></div>
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
