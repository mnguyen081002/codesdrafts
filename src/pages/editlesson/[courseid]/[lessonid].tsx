// const fetcher = (url: string) => fetch(url).then((res) => res.json());
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

import type { CategoryResponse, CourseResponse } from '../../../api/codesmooth-api';
import { CodeSmoothApi } from '../../../api/codesmooth-api';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import Button from '../../../common/Button';
import { LessonComponent } from '../../../components/LessionComponent';
import { LessonNav } from '../../../components/Lesson/LessonNav';
import { setSnackBar } from '../../../features/auth/appSlice';
import {
  selectActionCount,
  selectCategories,
  selectCourse,
  setCourse,
} from '../../../features/auth/LessonNavSlice';
import {
  onDrag,
  resetLesson,
  selectLesson,
  setLesson,
  setSummary,
  setTitle,
} from '../../../features/auth/LessonSlice';
import { ComponentType } from '../../../shared/enum/component';
import type { ILesson, LessonComponentProps } from '../../../shared/interface';
import { generateId } from '../../../utils/genId';

const EditLesson = () => {
  // const { courseId } = useParams();
  // const { data, error } = useSWR(`/api/courses/${courseId}`, fetcher);

  // if (error) return <div>failed to load</div>;
  // const components = useAppSelector(selectComponents);
  const lesson = useAppSelector<ILesson>(selectLesson);
  const dragItemRef = useRef<any>(null);
  const dragItemOverRef = useRef<any>(null);
  const course = useAppSelector<CourseResponse>(selectCourse);
  const categories = useAppSelector<CategoryResponse[]>(selectCategories);
  const actionCount = useAppSelector<number>(selectActionCount);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useAppDispatch();

  const router = useRouter();
  // TODO: loading state
  const handleLoad = async () => {
    if (router.isReady) {
      const { courseid, lessonid, draft } = router.query;
      const cat: CategoryResponse[] = [];
      let newLesson: ILesson;

      try {
        const res = await CodeSmoothApi.getLessonById(Number(lessonid));
        newLesson = res.data;
      } catch (error) {
        const cateId = generateId(18);
        newLesson = {
          id: Number(lessonid),
          course_category_id: cateId,
          isCompleted: false,
          order: 0,
          components: [
            {
              content: {
                html: '',
              },
              type: ComponentType.Text,
            },
          ],
          summary: '',
          title: 'New Lesson',
        };

        cat.push({
          id: cateId,
          order: 0,
          title: 'New Category',
          lessons: [newLesson],
        });
      }
      dispatch(setLesson(newLesson));
      const res = await CodeSmoothApi.getCourseById(Number(courseid));
      if (cat.length > 0) {
        res.data.category = cat;
      }

      dispatch(setCourse(res.data));
    }
  };
  useEffect(() => {
    handleLoad();
  }, [router.isReady, router.query, actionCount]);

  const onClickLesson = async (lessonId: number) => {
    setIsLoading(true);
    try {
      const res = await CodeSmoothApi.getLessonById(Number(lessonId));
      const newLesson = res.data;
      dispatch(resetLesson());

      dispatch(setLesson(newLesson));
      router.push(`/editlesson/${course.id}/${lessonId}`);
    } catch (error) {
      dispatch(setSnackBar({ message: 'Failed to load lesson', type: 'error' }));
    }

    setIsLoading(false);
  };

  const handleSave = async () => {
    setIsLoading(true);
    if (lesson.course_category_id) {
      await CodeSmoothApi.saveLesson(lesson);
    }
    dispatch(setSnackBar({ message: 'Saved', type: 'success' }));

    setIsLoading(false);
  };

  return (
    <Main
      meta={
        <Meta
          title="Next.js Boilerplate Presentation"
          description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
      isLoading={isLoading}
      headerChildren={
        <div className="mr-10 flex flex-1 justify-end gap-5">
          <Button
            onClick={handleSave}
            text="Save"
            className="h-10 w-20 bg-light-primary font-semibold text-white"
          />
          <Link href={`/lesson/${course.id}/${lesson.id}`}>
            <Button text="Preview" className="h-10 bg-light-primary font-semibold text-white" />
          </Link>
        </div>
      }
    >
      <div className="flex h-full w-full justify-start">
        <div className="fixed h-full w-[18%] bg-light-gray">
          <LessonNav
            className="h-[calc(100vh-3.5rem)]"
            editMode={true}
            onClickLesson={onClickLesson}
            categories={categories}
          />
        </div>
        <div className="ml-[18%] flex w-[82%] justify-center transition-all">
          {!isLoading ? (
            <div className="my-20 flex w-[70%] flex-col">
              <input
                type="text"
                placeholder="What is the title of your lesson?"
                className="mb-12 w-full rounded-normal border border-gray-400 p-2 py-3 text-lg outline-none"
                value={lesson.title}
                onChange={(e) => {
                  dispatch(setTitle(e.target.value));
                }}
              />
              {/** FIXME: textarea size issue */}
              <ReactTextareaAutosize
                placeholder="Summary"
                minRows={6}
                className="h-36 w-full resize-none rounded-normal border border-gray-400 p-2 outline-none"
                value={lesson.summary}
                defaultValue={lesson.summary}
                onChange={(e) => {
                  dispatch(setSummary(e.target.value));
                }}
              />

              <div className="mt-8 flex flex-col gap-2">
                {lesson.components.map((component: LessonComponentProps, index: number) => {
                  return (
                    <LessonComponent
                      key={index}
                      isLast={index === lesson.components.length - 1}
                      component={component}
                      index={index}
                      onDragStart={() => {
                        dragItemRef.current = index;
                      }}
                      onDragEnter={() => {
                        dragItemOverRef.current = index;
                      }}
                      onDragEnd={() => {
                        dispatch(
                          onDrag({
                            dragIndex: dragItemRef.current,
                            hoverIndex: dragItemOverRef.current,
                          }),
                        );
                      }}
                      isFocus={component.isFocus}
                    />
                  );
                })}
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

export default EditLesson;
