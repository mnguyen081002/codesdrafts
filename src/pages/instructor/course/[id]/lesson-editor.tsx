import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, Zoom } from 'react-toastify';

import type { ListCourseItemResponse } from '../../../../api/instructor/course';
import CodeSmoothInstructorCourseApi from '../../../../api/instructor/course';
import CodeSmoothInstructorLessonApi from '../../../../api/instructor/lesson';
import ArrowDownV3Icon from '../../../../common/Icons/ArrowDownV3';
import ArrowLeftV2Icon from '../../../../common/Icons/ArrowLeftV2';
import ArrowRightIcon from '../../../../common/Icons/ArrowRightIcon';
import { InputRectangle } from '../../../../common/Input';
import { PrimaryOutlineButton } from '../../../../components/Button';
import { RHFTextField } from '../../../../components/hook-form';
import FormProvider from '../../../../components/hook-form/FormProvider';
import { LessonComponentV2 } from '../../../../components/LessionComponent';
import HeaderManage from '../../../../layouts/Manage/Header';
import { ComponentType } from '../../../../shared/enum/component';
import type { LessonComponentProps } from '../../../../shared/interface';

function LessonSectionItem({ selected = false }: { selected?: boolean }) {
  const [isHover, setIsHover] = useState(false);
  const fontWeight = selected ? 'font-normal' : 'font-light';
  const border = selected ? 'border-l-[3px] border-selected' : 'border-l-[2px] border-light-border';

  return (
    <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      <div className={`px-[20px] hover:bg-[#f5f5f5]`}>
        <div className={`flex min-h-[40px] w-full cursor-pointer items-center ${border} pl-[20px]`}>
          <p className={`h-full text-center text-lg ${fontWeight} text-light-text-primary`}>
            Figma là gì ?
          </p>
        </div>
      </div>
      <div
        className={`flex ${
          !isHover ? 'h-[0px]' : 'h-[40px]'
        } items-center gap-[5px] overflow-hidden pl-[40px] transition-all hover:bg-[#f5f5f5]`}
      >
        <img src={'/images/icons/plus.svg'} alt="" className="h-[20px] w-[20px]" />
        <p className="text-sm text-light-text-primary">Thêm bài học</p>
      </div>
    </div>
  );
}

function LessonSection({ selected = false }: { selected?: boolean }) {
  return (
    <div className="cursor-pointer">
      <div
        className={`flex min-h-[45px] items-center justify-between ${
          selected && 'bg-light-sectionSelected'
        } px-[20px]`}
      >
        <p
          className={`text-xl font-normal ${
            selected ? 'text-light-primary' : 'text-light-text-primary'
          }`}
        >
          Giới thiệu khóa học
        </p>
        <ArrowRightIcon className="-rotate-90" pathFill={selected ? '#1363DF' : '#64686B'} />
      </div>
      <div className="flex  w-full flex-col">
        <LessonSectionItem selected />
        <LessonSectionItem />
        <div className="flex items-center gap-[5px] py-[10px] pl-[25px] hover:bg-light-gray">
          <img src={'/images/icons/plus.svg'} alt="" className="h-[20px] w-[20px]" />
          <p className="text-sm text-light-text-primary">Thêm danh mục</p>
        </div>
      </div>
    </div>
  );
}

function LessonSidebar(props) {
  const router = useRouter();
  const [isCollapse, setIsCollapse] = useState(false);
  return (
    <div className="relative w-fit">
      {/* <ArrowRightIcon
        onClick={() => {
          setIsCollapse(!isCollapse);
        }}
        pathFill="#fff"
        className={`absolute -right-3  z-30 ${
          !isCollapse && 'rotate-180'
        } cursor-pointer rounded-full bg-black`}
      /> */}
      <div
        className={`flex h-[870px] flex-col justify-between overflow-hidden border-r border-light-border font-lexend-deca transition-all duration-300`}
      >
        <div
          onClick={() => router.back()}
          className="flex h-[50px] cursor-pointer items-center gap-5 border-b border-light-border px-5 hover:bg-light-gray"
        >
          <ArrowLeftV2Icon className="mb-1" height="25px" width="25px" />
          <p>Quay lại</p>
        </div>
        <div className="flex flex-col gap-[10px] px-[20px] pt-[20px] pb-[30px]">
          <img src={props.course?.thumbnail} className="h-[150px] w-[225px] rounded-[5px]" alt="" />
          <p className="text-xl font-semibold leading-6">{props.course?.name}</p>
        </div>
        <div className="flex flex-1 flex-col">
          <LessonSection selected />
          <LessonSection />
          <div className="flex flex-col items-center justify-center py-[20px]">
            <div className="flex h-[44px] w-[202px] cursor-pointer items-center justify-center rounded-[3px] border border-light-border px-[15px] py-[12px] hover:bg-light-gray">
              <p className="text-sm font-normal text-light-text-primary">Đánh dấu đã hoàn thành</p>
            </div>
          </div>
        </div>
        <div className="flex h-[28px] items-center justify-center border-t border-light-border">
          <ArrowDownV3Icon className="h-[8px] w-[18px] rotate-180" pathFill="#64686B" />
        </div>
      </div>
    </div>
  );
}

type FormValuesProps = {
  title: string;
  summary: string;
};

const LessonEditor = () => {
  const router = useRouter();
  const [course, setCourse] = useState<ListCourseItemResponse>();
  const [refs, setRefs] = useState<React.MutableRefObject<LessonComponentProps>[]>([]);
  const methods = useForm<FormValuesProps>({
    defaultValues: {
      summary: '',
      title: '',
    },
  });

  const { handleSubmit, reset } = methods;
  const onSubmit = async (data: FormValuesProps) => {
    const req = {
      id: 646747403,
      title: data.title,
      summary: data.summary,
      components: refs.map((x) => x.current),
    };
    toast.promise(
      CodeSmoothInstructorLessonApi.saveLesson(req),
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
  };

  useEffect(() => {
    if (!router.query.id) return;

    const { id } = router.query;
    const fetchCourse = async () => {
      const res = await CodeSmoothInstructorCourseApi.getCourseById(Number(id));
      setCourse(res.data.data);
      const l = await CodeSmoothInstructorLessonApi.getLesson(646747403);
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

    fetchCourse();
  }, [router.query.id]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {/* {isLoading && <LoadingOverlay visible={isLoading} overlayColor="#000" opacity={0.6} />} */}
      <HeaderManage
        rightContent={
          <div>
            <PrimaryOutlineButton type="submit" text="Lưu" />
          </div>
        }
      />
      <div className="flex overflow-hidden">
        <LessonSidebar course={course} />
        <div className="flex h-[calc(100vh-74px)] flex-1 flex-col overflow-y-auto px-[325px] pt-[50px] pb-[200px] font-inter">
          <div className="flex flex-col gap-5">
            <RHFTextField
              sx={{
                '& .mantine-Input-input': {
                  height: '44px',
                  '::placeholder': {
                    color: '#64686B',
                    fontSize: '18px',
                  },
                },
              }}
              placeholder="Nhập tiêu đề ở đây"
              name="title"
            />
            <InputRectangle
              minRows={8}
              maxLength={800}
              type="text"
              placeholder="Nhập tóm tắt ở đây"
              name="summary"
            />
          </div>
          <div className="mt-4 flex flex-col">
            {refs.map((c, index) => {
              if (!c.current) return null;
              return (
                <LessonComponentV2 index={index} setRefs={setRefs} reference={c} key={index} />
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
    </FormProvider>
  );
};

export default LessonEditor;
