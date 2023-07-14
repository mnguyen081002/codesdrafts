import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import type { ListCourseItemResponse } from '../../../../api/instructor/course';
import CodeSmoothInstructorCourseApi from '../../../../api/instructor/course';
import ArrowDownV3Icon from '../../../../common/Icons/ArrowDownV3';
import ArrowLeftV2Icon from '../../../../common/Icons/ArrowLeftV2';
import ArrowRightIcon from '../../../../common/Icons/ArrowRightIcon';
import { InputRectangle } from '../../../../common/Input';
import { PrimaryOutlineButton } from '../../../../components/Button';
import { RHFTextField } from '../../../../components/hook-form';
import FormProvider from '../../../../components/hook-form/FormProvider';
import { LessonComponentV2 } from '../../../../components/LessionComponent';
import Footer from '../../../../layouts/Footer';
import HeaderManage from '../../../../layouts/Manage/Header';
import { ComponentType } from '../../../../shared/enum/component';
import type { ITextComponent, LessonComponentProps } from '../../../../shared/interface';

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

  const methods = useForm<FormValuesProps>();
  const { handleSubmit } = methods;
  const [components, setComponents] = useState<any[]>([]);
  const [refs, setRefs] = useState<React.MutableRefObject<LessonComponentProps>[]>([]);

  const onSubmit = (data: FormValuesProps) => {
    console.log('components', components);
  };

  useEffect(() => {
    if (!router.query.id) return;

    const { id } = router.query;
    const fetchCourse = async () => {
      const res = await CodeSmoothInstructorCourseApi.getCourseById(Number(id));
      setCourse(res.data.data);
    };

    fetchCourse();
  }, [router.query.id]);

  useEffect(() => {
    if (refs.length === 0) return;
    const lastRef = refs[refs.length - 1];
    if (lastRef !== undefined) {
      const x: ITextComponent = {
        type: ComponentType.Text,
        content: {
          html: '',
        },
      };
      lastRef.current = x;
    }
    setComponents([
      ...components,
      {
        ref: refs[refs.length - 1],
      },
    ]);
  }, [refs]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <HeaderManage
        rightContent={
          <div>
            <PrimaryOutlineButton type="submit" text="Lưu" />
          </div>
        }
      />
      <div className="flex">
        <LessonSidebar course={course} />
        <div className="flex flex-1 flex-col px-[325px] pt-[50px] pb-[200px] font-inter">
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
            {components.map((c, index) => {
              return <LessonComponentV2 index={index} reference={c.ref} key={index} />;
            })}

            <div
              className="h-[50px] cursor-text"
              onClick={() => {
                const ref: React.MutableRefObject<LessonComponentProps> = React.createRef() as any;
                setRefs([...refs, ref]);
              }}
            ></div>
          </div>
        </div>
      </div>
      <Footer />
    </FormProvider>
  );
};

export default LessonEditor;
