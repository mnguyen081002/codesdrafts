import { ArrowBack, Lens } from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import type { CourseResponse } from '../../../api/codesmooth-api';
import { CodeSmoothApi } from '../../../api/codesmooth-api';
import { useAppDispatch } from '../../../app/hooks';
import Button from '../../../common/Button';
import { LessonComponent } from '../../../components/LessionComponent';
import { LessonNav } from '../../../components/Lesson/LessonNav';
import { resetLesson, setLesson } from '../../../features/auth/LessonSlice';
import { Meta } from '../../../layouts/Meta';
import { ComponentType } from '../../../shared/enum/component';
import type { ILesson, ITextContent, LessonComponentProps } from '../../../shared/interface';
import { Main } from '../../../templates/Main';
import CustomEditor from '../../../utils/CustomEditor';

function TableOfContentItem(props) {
  return (
    <Link href={`#${props.content.index}`} className="flex flex-row items-center gap-2">
      <Lens
        style={{
          fontSize: '5px',
        }}
        className="text-light-primary"
      />
      <p className="font-serif text-lg hover:text-light-primary">{props.content.title}</p>
    </Link>
  );
}

const Lesson = () => {
  const router = useRouter();
  const [course, setCourse] = useState<CourseResponse>();
  const [currentLesson, setCurrentLesson] = useState<ILesson>();
  const [isLoading, setIsLoading] = useState(false);
  const [tableOfContent, setTableOfContent] = useState<any>([]);
  const dispatch = useAppDispatch();
  const getPrevLessonId = () => {
    const listLesson: any = [];
    course?.category.forEach((category) => {
      category.lessons.forEach((lesson) => {
        listLesson.push(lesson);
      });
    });
    const prevLesson = listLesson.find((lesson) => lesson.id === Number(router.query.lessonid));
    return prevLesson.id;
  };

  const onClickPreviosLesson = async () => {
    setIsLoading(true);
    const prevLessonId = getPrevLessonId();
    router.push(`/lesson/${course?.id}/${prevLessonId}`);
    const res = await CodeSmoothApi.getLessonById(Number(prevLessonId));
    const newLesson = res.data;

    dispatch(resetLesson());

    dispatch(setLesson(newLesson));
    setIsLoading(false);
  };

  const onClickLesson = async (lessonId: number) => {
    setIsLoading(true);
    router.push(`/lesson/${course?.id}/${lessonId}`);
    const res = await CodeSmoothApi.getLessonById(Number(lessonId));
    const newLesson = res.data;

    setCurrentLesson(newLesson);

    setIsLoading(false);
  };

  const getTableOfContent = (lesson: ILesson) => {
    const tableOfContent: any = [];
    if (!lesson) return tableOfContent;

    for (let i = 0; i < lesson.components.length; i++) {
      const component = lesson.components[i]!;

      const content = component.content as ITextContent;

      if (component.type === ComponentType.Text) {
        const arrayChild: any = CustomEditor.deserializeFromHtml(content.html);

        if (arrayChild.length === 0) continue;

        if (!arrayChild[0].children) continue;

        const { text } = arrayChild[0].children[0];

        const item = { title: text, children: [], index: i };
        switch (arrayChild[0]?.type) {
          case 'heading-two':
            tableOfContent.push(item);
            break;

          case 'heading-three':
            if (tableOfContent.length === 0) {
              tableOfContent.push(item);
            } else {
              tableOfContent[tableOfContent.length - 1].children.push({
                title: text,
                children: [],
                index: i,
              });
            }
            break;
          case 'heading-four':
            if (tableOfContent.length === 0) {
              tableOfContent.push(item);
            } else if (tableOfContent[tableOfContent.length - 1].children.length === 0) {
              tableOfContent[tableOfContent.length - 1].children.push({
                title: text,
                children: [],
              });
            } else {
              // if table index has h3
              tableOfContent[tableOfContent.length - 1].children[
                tableOfContent[tableOfContent.length - 1].children.length - 1
              ].children.push(item);
            }
            break;

          default:
            break;
        }
      }
    }
    return tableOfContent;
  };

  useEffect(() => {
    const { courseid, lessonid } = router.query;

    const fetch = async () => {
      setIsLoading(true);
      if (!router.isReady) return;
      const fetchCourse = async () => {
        const res = await CodeSmoothApi.getCourseById(Number(courseid));
        setCourse(res.data);
      };

      const fetchLesson = async () => {
        const res = await CodeSmoothApi.getLessonById(Number(lessonid));
        setCurrentLesson(res.data);
      };

      await fetchLesson();
      await fetchCourse();

      setIsLoading(false);
    };
    fetch();
  }, [router.isReady]);

  useEffect(() => {
    setTableOfContent(getTableOfContent(currentLesson!));
  }, [currentLesson]);

  return (
    <Main meta={<Meta title={course?.id.toString() || ''} description="Lorem ipsum" />}>
      <div className="flex h-full w-full justify-start">
        <div className="fixed h-full w-[15%] bg-light-gray">
          <div className="fixed h-full w-[15%] bg-light-gray">
            <LessonNav onClickLesson={onClickLesson} categories={course?.category} />
          </div>
        </div>
        <div className="ml-[15%] flex w-[85%] justify-center transition-all">
          {!isLoading ? (
            <div className="my-10 flex w-[70%] flex-col">
              <p className="text-4xl font-semibold">{currentLesson?.title}</p>
              <p>{currentLesson?.summary}</p>
              <div className="mt-4 flex w-fit flex-col rounded-md border bg-neutral-100">
                <p className="border border-neutral-200 py-2 px-4 text-lg font-medium">Mục lục</p>
                <div className="flex w-fit flex-col py-3">
                  {tableOfContent.map((h2: any, index: number) => {
                    return (
                      <div className="gap-2 px-4" key={index}>
                        <TableOfContentItem content={h2} />
                        {h2.children.map((h3: any, index: number) => {
                          return (
                            <div key={index} className="px-4 text-lg">
                              <TableOfContentItem content={h3} />
                              {h3.children.map((h4: any, index: number) => {
                                return (
                                  <div key={index} className="flex flex-row items-center gap-2">
                                    <TableOfContentItem content={h4} />
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-2">
                {currentLesson?.components.map((component: LessonComponentProps, index: number) => {
                  return (
                    <section key={index} id={index.toString()}>
                      <LessonComponent isReadOnly component={component} index={index} />
                    </section>
                  );
                })}
              </div>
              <div className="mt-10 mb-60 flex flex-col ">
                <div className="flex">
                  <Button
                    fontIcon={<ArrowBack />}
                    className="rounded-none"
                    text="Trở về"
                    onClick={onClickPreviosLesson}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    </Main>
  );
};

export default Lesson;
