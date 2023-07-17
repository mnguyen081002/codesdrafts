import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import type { GetCourseByIDResponse, Section } from '../../../api/instructor/course';
import type { AddSectionResponse } from '../../../api/instructor/section';
import ArrowDownV3Icon from '../../../common/Icons/ArrowDownV3';
import ArrowLeftV2Icon from '../../../common/Icons/ArrowLeftV2';
import SectionItem from './SectionItem';

interface LessonSidebarProps {
  course?: GetCourseByIDResponse;
}

function LessonSidebar(props: LessonSidebarProps) {
  const router = useRouter();
  const [isCollapse, setIsCollapse] = useState(false);
  const [sections, setSections] = useState<Section[]>([]);

  const onAddSection = (section?: AddSectionResponse) => {
    if (!section) return;
    setSections((sections) => [
      ...sections,
      {
        ...section,
      },
    ]);
  };

  const onDeleteSection = (section_id?: number) => {
    setSections((sections) => sections.filter((section) => section.id !== section_id));
  };

  useEffect(() => {
    setSections(props.course?.sections || []);
  }, [props.course]);

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
        <Link
          href={`/instructor/course/course-editor/?id=${router.query.id}`}
          className="flex h-[50px] cursor-pointer items-center gap-5 border-b border-light-border px-5 hover:bg-light-gray"
        >
          <ArrowLeftV2Icon className="mb-1" height="25px" width="25px" />
          <p>Quay lại</p>
        </Link>
        <div className="flex flex-col gap-[10px] px-[20px] pt-[20px] pb-[30px]">
          <img src={props.course?.thumbnail} className="h-[150px] w-[225px] rounded-[5px]" alt="" />
          <p className="text-xl font-semibold leading-6">{props.course?.name}</p>
        </div>
        <div className="flex flex-1 flex-col overflow-y-auto">
          {sections.map((section) => (
            <SectionItem
              // onEditSection={onEditSection}
              onDeletedSection={onDeleteSection}
              onAddSection={onAddSection}
              section={section}
              key={section.id}
            />
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
