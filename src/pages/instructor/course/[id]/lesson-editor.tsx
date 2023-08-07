import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, Zoom } from 'react-toastify';

import type { GetCourseByIDResponse } from '../../../../api/instructor/course';
import CodedraftsInstructorCourseApi from '../../../../api/instructor/course';
import type { SaveLessonRequest } from '../../../../api/instructor/lesson';
import CodedraftsInstructorLessonApi from '../../../../api/instructor/lesson';
import { InputRectangle } from '../../../../common/Input';
import { PrimaryOutlineButton } from '../../../../components/Button';
import { RHFTextField } from '../../../../components/hook-form';
import FormProvider from '../../../../components/hook-form/FormProvider';
import { LessonComponent } from '../../../../components/LessionComponent';
import LessonTableOfContent from '../../../../components/Lesson/LessonTableOfContent';
import LessonSidebar from '../../../../components/Lesson/Sidebar/LessonSidebar';
import HeaderManage from '../../../../layouts/Manage/Header';
import { ComponentType } from '../../../../shared/enum/component';
import type { LessonComponentProps } from '../../../../shared/interface';

type FormValuesProps = {
  title: string;
  summary: string;
};

const LessonEditor = () => {
  const router = useRouter();
  const [course, setCourse] = useState<GetCourseByIDResponse>();
  const [refs, setRefs] = useState<React.MutableRefObject<LessonComponentProps>[]>([]);
  const [isCollapseSidebar, setIsCollapseSidebar] = useState(false);
  const [hoverStartTyping, setHoverStartTyping] = useState(false);
  const methods = useForm<FormValuesProps>({
    defaultValues: {
      summary: '',
      title: '',
    },
  });
  const { handleSubmit, reset } = methods;

  const fetchCourse = async () => {
    if (!router.query.id) return;

    const { id, section_id, lesson_id } = router.query;
    const res = await CodedraftsInstructorCourseApi.getCourseById(Number(id));
    if (!section_id) {
      router.push(
        `/instructor/course/${id}/lesson-editor?section_id=${res.data.data.sections[0]?.id}&lesson_id=${res.data.data.sections[0]?.lessons[0]?.id}`,
      );
      return;
    }
    setCourse(res.data.data);
    const l = await CodedraftsInstructorLessonApi.getLesson(Number(router.query.lesson_id));
    reset({
      title: l.data.data.title,
      summary: l.data.data.summary,
    });
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

  const onSubmit = async (data: FormValuesProps) => {
    const req: SaveLessonRequest = {
      id: Number(router.query.lesson_id),
      title: data.title,
      summary: data.summary,
      components: refs.map((x) => x.current),
      section_id: Number(router.query.section_id),
    };
    await toast.promise(
      CodedraftsInstructorLessonApi.saveLesson(req),
      {
        pending: 'Đang lưu bài học',
        success: 'Lưu bài học thành công!',
        error: 'Lưu bài học thất bại!',
      },
      {
        autoClose: 500,
        hideProgressBar: true,
        transition: Zoom,
      },
    );
    await fetchCourse();
  };

  useEffect(() => {
    fetchCourse();
  }, [router.query.id, router.query.lesson_id]);

  return (
    <FormProvider methods={methods}>
      <HeaderManage
        rightContent={
          <div>
            <PrimaryOutlineButton onClick={handleSubmit(onSubmit)} text="Lưu" />
          </div>
        }
      />
      <div className="relative flex overflow-hidden">
        <LessonSidebar
          isCollapse={isCollapseSidebar}
          onClickCollapse={() => setIsCollapseSidebar(!isCollapseSidebar)}
          course={course}
        />
        <LessonTableOfContent values={refs} />
        <div className="flex h-[calc(100vh-74px)] flex-1 flex-col overflow-y-auto px-[325px] pt-[50px] pb-[200px] font-inter">
          <div className="flex flex-col gap-5">
            <RHFTextField
              onChange={(e) => {
                router.query.title = e.target.value;
                router.replace(router, undefined, { shallow: true });
              }}
              sx={{
                '& .mantine-Input-input': {
                  height: '44px',
                  '::placeholder': {
                    color: 'rgb(45 45 45 / 0.3)',
                    fontSize: '18px',
                    fontFamily: 'Lexend Deca',
                    fontWeight: 300,
                  },
                },
              }}
              placeholder="Nhập tiêu đề ở đây"
              name="title"
            />
            <InputRectangle
              className="font-lexend-deca font-light text-light-text-lessonContent/30"
              minRows={8}
              maxLength={800}
              type="text"
              placeholder="Nhập tóm tắt ở đây"
              name="summary"
            />
          </div>
          <div className="mt-4 flex flex-col">
            <div className={`font-lexend-deca text-lg font-light text-light-text-lessonContent/30`}>
              Hãy thêm nội dung bằng cách click vào bên dưới
            </div>
            {refs.map((c, index) => {
              if (!c.current) return null;
              return <LessonComponent index={index} setRefs={setRefs} reference={c} key={index} />;
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
    </FormProvider>
  );
};

export default LessonEditor;
