import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import type { GetSectionWithLessonByCourseIDResponse } from '../../../api/codedrafts-api';
import { StudentApi } from '../../../api/codedrafts-api';
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
  const [sections, setSections] = useState<GetSectionWithLessonByCourseIDResponse[]>([]);
  const [refs, setRefs] = useState<React.MutableRefObject<LessonComponentProps>[]>([]);
  const [isCollapseSidebar, setIsCollapseSidebar] = useState(false);
  const [lesson, setLesson] = useState<GetLessonResponse>();

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
    const l = await StudentApi.getLessonById(Number(lesson_id));
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
  }, []);
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
