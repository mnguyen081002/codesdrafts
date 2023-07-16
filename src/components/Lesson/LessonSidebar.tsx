import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import type { GetCourseByIDResponse, Lesson, Section } from '../../api/instructor/course';
import ArrowDownV3Icon from '../../common/Icons/ArrowDownV3';
import ArrowLeftV2Icon from '../../common/Icons/ArrowLeftV2';
import ArrowRightIcon from '../../common/Icons/ArrowRightIcon';
import TrashIcon from '../../common/Icons/TrashIcon';

function LessonItem({ lesson }: { lesson: Lesson }) {
  const router = useRouter();

  const { lesson_id } = router.query;
  const isSelect = Number(lesson_id) === lesson.id;
  const [isHover, setIsHover] = useState(false);
  const fontWeight = isSelect ? 'font-normal' : 'font-light';
  const border = isSelect ? 'border-l-[3px] border-selected' : 'border-l-[2px] border-light-border';
  return (
    <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      <div
        className={`px-[20px] hover:bg-[#f5f5f5]`}
        onClick={() =>
          router.push(
            `/instructor/course/${router.query.id}/lesson-editor?section_id=${lesson.section_id}&lesson_id=${lesson.id}`,
          )
        }
      >
        <div className={`flex min-h-[40px] w-full cursor-pointer items-center ${border} pl-[20px]`}>
          <p className={`h-full text-center text-lg ${fontWeight} text-light-text-primary`}>
            {lesson.title}
          </p>
        </div>
      </div>
      <div
        className={`flex ${
          !isHover ? 'h-[0px]' : 'h-[40px]'
        } items-center overflow-hidden pl-[20px] `}
      >
        <div className="flex h-[40px] items-center gap-1 px-2 transition-all hover:bg-[#f5f5f5]">
          <img src={'/images/icons/plus.svg'} alt="" className="h-[15px] w-[15px]" />
          <p className="text-xs text-light-text-primary">Thêm bài học</p>
        </div>
        <div className="flex h-[40px] items-center px-2 transition-all hover:bg-[#f5f5f5]">
          <TrashIcon pathFill="#4C4E64" height="15px" width="15px" />
          <p className="text-xs text-light-text-primary">Xóa bài học</p>
        </div>
      </div>
    </div>
  );
}

function SectionItem({ section }: { section: Section }) {
  const [isHover, setIsHover] = useState(false);
  const router = useRouter();

  const { section_id, lesson_id } = router.query;
  const [isSeleted, setIsSeleted] = useState(Number(section_id) === section.id);

  useEffect(() => {
    setIsSeleted(Number(section_id) === section.id);
  }, [section_id]);
  return (
    <div className="cursor-pointer">
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className=""
      >
        <div
          className={` flex min-h-[45px] items-center justify-between ${
            isSeleted && 'bg-light-sectionSelected'
          } px-[20px]`}
        >
          <p
            className={`text-xl font-normal ${
              isSeleted ? 'text-light-primary' : 'text-light-text-primary'
            }`}
          >
            {section.title}
          </p>
          <ArrowRightIcon className="-rotate-90" pathFill={isSeleted ? '#1363DF' : '#64686B'} />
        </div>
        <div
          className={`flex ${
            isHover ? 'h-[40px]' : 'h-0'
          } items-center justify-center gap-1 overflow-hidden transition-all hover:bg-[#f5f5f5]`}
        >
          <TrashIcon height="18px" width="18px" pathFill="#4C4E64" />
          <p className="text-sm text-light-text-primary">Xóa danh mục</p>
        </div>
      </div>

      <div className="flex  w-full flex-col">
        {section.lessons.map((lesson) => (
          <LessonItem lesson={lesson} key={lesson.id} />
        ))}
        <div className="flex items-center gap-[5px] py-[10px] pl-[25px] hover:bg-light-gray">
          <img src={'/images/icons/plus.svg'} alt="" className="h-[20px] w-[20px]" />
          <p className="text-sm text-light-text-primary">Thêm danh mục</p>
        </div>
      </div>
    </div>
  );
}

interface LessonSidebarProps {
  course?: GetCourseByIDResponse;
}

function LessonSidebar(props: LessonSidebarProps) {
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
        className={`flex h-[870px] flex-col justify-between border-r border-light-border font-lexend-deca transition-all duration-300`}
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
          {props.course?.sections.map((section) => (
            <SectionItem section={section} key={section.id} />
          ))}
          {/* <LessonSection section={se} /> */}
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

export default LessonSidebar;
