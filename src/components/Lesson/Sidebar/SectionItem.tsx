import { useClickOutside } from '@mantine/hooks';
import { HttpStatusCode } from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import type { SidebarLesson, SidebarSection } from '../../../api/base/interface/course';
import CodedraftsInstructorLessonApi from '../../../api/instructor/lesson';
import type { AddSectionResponse } from '../../../api/instructor/section';
import CodedraftsInstructorSectionApi from '../../../api/instructor/section';
import ArrowRightIcon from '../../../common/Icons/ArrowRightIcon';
import EditIcon from '../../../common/Icons/EditIcon';
import TrashIcon from '../../../common/Icons/TrashIcon';
import { TOAST_CONFIG } from '../../../shared/constants/app';
import LessonItem from './LessonItem';

function SectionItem({
  section,
  onAddSection,
  onDeletedSection,
  isLast,
  isPreview = false,
}: // onEditSection,
{
  section: SidebarSection;
  onAddSection: (r?: AddSectionResponse) => void;
  onDeletedSection: (section_id?: number) => void;
  isLast: boolean;
  isPreview?: boolean;
  // onEditSection: (section_id: number, title: string) => void;
}) {
  const router = useRouter();

  const { section_id, lesson_id } = router.query;
  const [isSeleted, setIsSeleted] = useState(Number(section_id) === section.id);
  const [isEdit, setIsEdit] = useState(false);
  const [titleEdited, setTitleEdited] = useState(section.title);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowLesson, setIsShowLesson] = useState(isSeleted);
  const [lessons, setLessons] = useState<SidebarLesson[]>(section.lessons);
  const ref = useClickOutside(() => setIsEdit(false));

  useEffect(() => {
    const { section_id } = router.query;
    setIsSeleted(Number(section_id) === section.id);
  }, [router.query.section_id]);

  useEffect(() => {
    const { title, lesson_id } = router.query;

    if (!title || !lesson_id) return;

    // get lesson by id from section

    lessons.forEach((lesson) => {
      if (lesson.id === Number(lesson_id)) {
        lesson.title = title as string;
        setLessons([...lessons]);
      }
    });
    setLessons([...section.lessons]);
  }, [router.query.title]);

  return (
    <div className="cursor-pointer" draggable>
      <div
        ref={ref}
        className=""
        onClick={() => {
          setIsShowLesson(!isShowLesson);
        }}
      >
        <div
          className={` flex min-h-[45px] w-[265px] items-center justify-between ${
            isSeleted && 'bg-light-sectionSelected'
          } px-[10px]`}
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
                    CodedraftsInstructorSectionApi.updateSection(section.id, e.currentTarget.value),
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
          <ArrowRightIcon
            className={`${
              isShowLesson ? '-rotate-90' : 'rotate-[-270deg]'
            } transition-transform duration-300 `}
            pathFill={isSeleted ? '#1363DF' : '#64686B'}
          />
        </div>
        {!isPreview && (
          <div
            className={`flex ${
              isShowLesson ? 'h-[40px]' : 'h-0'
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
                if (isLast) {
                  toast.error('Không thể xóa danh mục cuối cùng!', TOAST_CONFIG);
                  toast.clearWaitingQueue();
                  return;
                }

                const r = await toast.promise(
                  CodedraftsInstructorSectionApi.deleteSection(section.id),
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
        )}
      </div>
      {isShowLesson && (
        <div className="relative flex w-full   flex-col overflow-hidden">
          <div>
            {lessons.map((lesson) => (
              <LessonItem
                isPreview={isPreview}
                onDeletedLesson={async (lesson_id) => {
                  if (!lesson_id) return;
                  const rs = await CodedraftsInstructorLessonApi.getLessonsBySectionId(section.id);
                  setLessons(rs.data.data);
                }}
                onAddLesson={async (r) => {
                  if (!r) return;
                  const rs = await CodedraftsInstructorLessonApi.getLessonsBySectionId(section.id);
                  setLessons(rs.data.data);
                }}
                lesson={lesson}
                key={lesson.id}
                isLast={lesson.id === lessons[lessons.length - 1]!.id}
              />
            ))}
          </div>
          {!isPreview && (
            <div
              className="flex items-center gap-[5px] py-[10px] pl-[25px] hover:bg-light-gray"
              onClick={async () => {
                const r = await toast.promise(
                  CodedraftsInstructorSectionApi.addSection({
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
          )}
        </div>
      )}
    </div>
  );
}

export default SectionItem;
