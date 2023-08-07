import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import type { BaseGetCourseByIDResponse, SidebarSection } from '../../../api/base/interface/course';
import type { AddSectionResponse } from '../../../api/instructor/section';
import ArrowDownV3Icon from '../../../common/Icons/ArrowDownV3';
import ArrowLeftV2Icon from '../../../common/Icons/ArrowLeftV2';
import ArrowRightIcon from '../../../common/Icons/ArrowRightIcon';
import SectionItem from './SectionItem';

interface LessonSidebarProps {
  course?: BaseGetCourseByIDResponse;
  isCollapse: boolean;
  onClickCollapse: () => void;
  isPreview?: boolean;
}

function LessonSidebar(props: LessonSidebarProps) {
  const router = useRouter();
  const [sections, setSections] = useState<SidebarSection[]>([]);

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
    <div
      className={`sticky top-0 transition-all duration-300 ${
        props.isCollapse ? 'w-0' : 'w-[265px]'
      }`}
    >
      <div className="relative w-full">
        <ArrowRightIcon
          onClick={() => {
            props.onClickCollapse();
          }}
          pathFill="#fff"
          className={`absolute -right-3  z-30 ${
            !props.isCollapse && 'rotate-180'
          } cursor-pointer rounded-full bg-black`}
        />
      </div>
      <div className="relative">
        <div
          className={`absolute w-[265px] transition-all duration-300 ${
            props.isCollapse ? 'left-[-265px]' : 'left-0'
          } `}
        >
          <div
            className={`flex h-[870px] flex-col justify-between border-r border-light-border font-lexend-deca transition-all duration-300`}
          >
            <button
              onClick={() => {
                router.back();
              }}
              className="flex h-[50px] cursor-pointer items-center gap-5 border-b border-light-border px-5 hover:bg-light-gray"
            >
              <ArrowLeftV2Icon className="mb-1" height="25px" width="25px" />
              <p>Quay lại</p>
            </button>
            <div className="flex flex-col gap-[10px] px-[20px] pt-[20px] pb-[30px]">
              <img
                src={props.course?.thumbnail}
                className="h-[150px] w-[225px] rounded-[5px]"
                alt=""
              />
              <p className="text-xl font-semibold leading-6">{props.course?.name}</p>
            </div>
            <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
              {sections.map((section) => (
                <SectionItem
                  isPreview={props.isPreview}
                  onDeletedSection={onDeleteSection}
                  onAddSection={onAddSection}
                  section={section}
                  key={section.id}
                  isLast={section.id === sections[sections.length - 1]!.id}
                />
              ))}
              {!props.isPreview && (
                <div className="flex flex-col items-center justify-center py-[20px]">
                  <div className="flex h-[44px] w-[202px] cursor-pointer items-center justify-center rounded-[3px] border border-light-border px-[15px] py-[12px] hover:bg-light-gray">
                    <p className="text-sm font-normal text-light-text-primary">
                      Đánh dấu đã hoàn thành
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex h-[28px] items-center justify-center border-t border-light-border">
              <ArrowDownV3Icon className="h-[8px] w-[18px] rotate-180" pathFill="#64686B" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LessonSidebar;
