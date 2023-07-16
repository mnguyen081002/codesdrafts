import { useClickOutside } from '@mantine/hooks';
import { HttpStatusCode } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import type { GetCourseByIDResponse, Lesson, Section } from '../../api/instructor/course';
import type { AddSectionResponse } from '../../api/instructor/section';
import CodeSmoothInstructorSectionApi from '../../api/instructor/section';
import ArrowDownV3Icon from '../../common/Icons/ArrowDownV3';
import ArrowLeftV2Icon from '../../common/Icons/ArrowLeftV2';
import ArrowRightIcon from '../../common/Icons/ArrowRightIcon';
import EditIcon from '../../common/Icons/EditIcon';
import TrashIcon from '../../common/Icons/TrashIcon';
import { TOAST_CONFIG } from '../../shared/constants/app';

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

function SectionItem({
  section,
  onAddSection,
  onDeletedSection,
}: // onEditSection,
{
  section: Section;
  onAddSection: (r?: AddSectionResponse) => void;
  onDeletedSection: (section_id?: number) => void;
  // onEditSection: (section_id: number, title: string) => void;
}) {
  const [isHover, setIsHover] = useState(false);
  const router = useRouter();

  const { section_id, lesson_id } = router.query;
  const [isSeleted, setIsSeleted] = useState(Number(section_id) === section.id);
  const [isEdit, setIsEdit] = useState(false);
  const [titleEdited, setTitleEdited] = useState(section.title);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useClickOutside(() => setIsEdit(false));
  useEffect(() => {
    setIsSeleted(Number(section_id) === section.id);
  }, [section_id]);
  return (
    <div className="cursor-pointer">
      <div
        ref={ref}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className=""
      >
        <div
          className={` flex min-h-[45px] w-[265px] items-center justify-between ${
            isSeleted && 'bg-light-sectionSelected'
          } px-[20px]`}
        >
          {!isEdit ? (
            <p
              className={`text-xl font-normal ${
                isSeleted ? 'text-light-primary' : 'text-light-text-primary'
              }`}
            >
              {titleEdited}
            </p>
          ) : (
            <input
              className="h-fit  border-none bg-transparent text-xl font-normal text-light-text-primary outline-none"
              defaultValue={titleEdited}
              onChange={(e) => setTitleEdited(e.currentTarget.value)}
              onKeyDown={async (e) => {
                if (e.key === 'Enter') {
                  setIsEdit(false);
                  if (titleEdited === section.title && !isLoading) return;
                  setIsLoading(true);
                  const r = await toast.promise(
                    CodeSmoothInstructorSectionApi.updateSection(section.id, e.currentTarget.value),
                    {
                      pending: 'Đang cập nhật danh mục...',
                      success: 'Cập nhật danh mục thành công!',
                      error: 'Cập nhật danh mục thất bại!',
                    },
                    TOAST_CONFIG,
                  );
                  if (r.status !== HttpStatusCode.Ok) {
                    setTitleEdited(section.title);
                  }
                  setIsLoading(false);
                }
              }}
            />
          )}
          <ArrowRightIcon className="-rotate-90" pathFill={isSeleted ? '#1363DF' : '#64686B'} />
        </div>
        <div
          className={`flex ${
            isHover ? 'h-[40px]' : 'h-0'
          } items-center justify-center gap-1 overflow-hidden transition-all `}
        >
          <div
            onClick={() => setIsEdit(true)}
            className="flex h-full flex-1 items-center justify-center gap-1 hover:bg-[#f5f5f5]"
          >
            <EditIcon height="15px" width="15px" pathFill="#4C4E64" />
            <p className="text-xs text-light-text-primary ">Sửa danh mục</p>
          </div>
          <div
            onClick={async () => {
              const r = await toast.promise(
                CodeSmoothInstructorSectionApi.deleteSection(section.id),
                {
                  pending: 'Đang xóa danh mục...',
                  success: 'Xóa danh mục thành công!',
                  error: 'Xóa danh mục thất bại!',
                },
                TOAST_CONFIG,
              );
              if (r.status === HttpStatusCode.Ok) {
                onDeletedSection(section.id);
              } else {
                onDeletedSection(undefined);
              }
            }}
            className="flex h-full flex-1 items-center justify-center gap-1 hover:bg-[#f5f5f5]"
          >
            {/** TODO: Popup confirm delete section */}
            <TrashIcon height="15px" width="15px" pathFill="#4C4E64" />
            <p className="text-xs text-light-text-primary ">Xóa danh mục</p>
          </div>
        </div>
      </div>

      <div className="flex  w-full flex-col">
        {section.lessons.map((lesson) => (
          <LessonItem lesson={lesson} key={lesson.id} />
        ))}
        <div
          className="flex items-center gap-[5px] py-[10px] pl-[25px] hover:bg-light-gray"
          onClick={async () => {
            const r = await toast.promise(
              CodeSmoothInstructorSectionApi.addSection({
                course_id: Number(router.query.id),
                order: section.order + 1,
              }),
              {
                pending: 'Đang thêm danh mục...',
                success: 'Thêm danh mục thành công!',
                error: 'Lưu danh mục thất bại!',
              },
              TOAST_CONFIG,
            );

            if (r.status === HttpStatusCode.Created) {
              onAddSection(r.data.data);
            } else {
              onAddSection(undefined);
            }
          }}
        >
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

  const onEditSection = (section_id: number, title: string) => {
    setSections((sections) => {
      const sectionIndex = sections.findIndex((section) => section.id === section_id);
      if (sectionIndex === -1) return sections;

      sections[sectionIndex]!.title = title;

      return [...sections];
    });
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
