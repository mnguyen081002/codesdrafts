// const fetcher = (url: string) => fetch(url).then((res) => res.json());
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

import type { CategoryResponse, CourseResponse } from '../../../api/codesmooth-api';
import { CodeSmoothApi } from '../../../api/codesmooth-api';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import Button from '../../../common/Button';
import { LessionNav } from '../../../components/Lession/LessionNav';
import { LessionComponent } from '../../../components/LessionComponent';
import {
  onDrag,
  selectLesson,
  setLession,
  setSummary,
  setTitle,
} from '../../../features/auth/LessonSlice';
import { CourseCategoryType } from '../../../shared/enum/category';
import { ComponentType } from '../../../shared/enum/component';
import type { ILesson, LessionComponentProps } from '../../../shared/interface';
import { generateId } from '../../../utils/genId';
import { defaultCourse } from '../../editcourse/[id]';

const EditLession = () => {
  // const { courseId } = useParams();
  // const { data, error } = useSWR(`/api/courses/${courseId}`, fetcher);

  // if (error) return <div>failed to load</div>;
  // const components = useAppSelector(selectComponents);
  const lession = useAppSelector<ILesson>(selectLesson);
  const dragItemRef = useRef<any>(null);
  const dragItemOverRef = useRef<any>(null);
  const [course, setCourse] = useState<CourseResponse>(defaultCourse);
  const [isLoading, setIsLoading] = useState(false);
  console.log('Lession', lession);
  const dispatch = useAppDispatch();

  const router = useRouter();
  // TODO: loading state
  useEffect(() => {
    const handleLoad = async () => {
      if (router.isReady) {
        const { courseid, lessionid, draft } = router.query;
        const categories: CategoryResponse[] = [];
        let newLession: ILesson;

        try {
          if (draft) {
            const res = await CodeSmoothApi.getLession(Number(lessionid));
            newLession = res.data;
          } else {
            const res = await CodeSmoothApi.getLession(Number(lessionid));
            newLession = res.data;
          }
        } catch (error) {
          const cateId = generateId(18);
          newLession = {
            id: Number(lessionid),
            course_category_id: cateId,
            components: [
              {
                content: {
                  html: '',
                },
                type: ComponentType.Text,
              },
            ],
            name: 'New Lession',
            summary: 'New Summary',
            title: 'New Lession',
          };

          categories.push({
            id: cateId,
            title: 'New Category',
            lessions: [newLession],
          });
        }
        dispatch(setLession(newLession));
        const res = await CodeSmoothApi.getCourseById(Number(courseid));
        if (categories.length > 0) {
          res.data.category = categories;
        }
        setCourse(res.data);
      }
    };
    handleLoad();
  }, [router.isReady]);

  const handleSave = async () => {
    setIsLoading(true);
    if (lession.course_category_id) {
      await CodeSmoothApi.createCategory(
        'New Category',
        lession.course_category_id,
        course.id,
        CourseCategoryType.ASSESMENT,
      );
      // TODO: loading save
      await CodeSmoothApi.saveLession(lession);
    }
    alert('Save success');

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
      headerChildren={
        <div className="mr-28 flex flex-1 justify-end">
          <Button onClick={handleSave} text="Save" className="bg-light-primary text-white" />
        </div>
      }
    >
      <div className="flex h-full w-full justify-start">
        <div className="h-full w-[15%] bg-slate-100">
          <LessionNav category={course.category} />
        </div>
        <div className="flex w-[85%] justify-center">
          <div className="my-20 flex w-[70%] flex-col">
            <input
              type="text"
              placeholder="Title"
              className="mb-12 w-full rounded-normal border border-gray-400 p-2 outline-none"
              value={lession.title}
              onChange={(e) => {
                dispatch(setTitle(e.target.value));
              }}
            />
            {/** FIXME: textarea size issue */}
            <ReactTextareaAutosize
              placeholder="Summary"
              minRows={6}
              className="h-36 w-full resize-none rounded-normal border border-gray-400 p-2 outline-none"
              value={lession.summary}
              defaultValue={lession.summary}
              onChange={(e) => {
                dispatch(setSummary(e.target.value));
              }}
            />

            <div className="mt-8 flex flex-col gap-2">
              {lession.components.map((component: LessionComponentProps, index: number) => {
                return (
                  <LessionComponent
                    key={index}
                    isLast={index === lession.components.length - 1}
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
        </div>
      </div>
    </Main>
  );
};

export default EditLession;
