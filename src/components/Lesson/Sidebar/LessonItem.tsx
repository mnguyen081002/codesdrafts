import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import type { Lesson } from '../../../api/instructor/course';
import type { AddLessonResponse } from '../../../api/instructor/lesson';
import CodeSmoothInstructorLessonApi from '../../../api/instructor/lesson';
import TrashIcon from '../../../common/Icons/TrashIcon';
import { TOAST_CONFIG } from '../../../shared/constants/app';

function LessonItem({
  lesson,
  onAddLesson,
  onDeletedSection,
}: {
  lesson: Lesson;
  onAddLesson: (r?: AddLessonResponse) => Promise<void>;
  onDeletedSection: (lesson_id?: number) => Promise<void>;
}) {
  const router = useRouter();
  const [isSelect, setIsSelect] = useState(false);

  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    const { lesson_id } = router.query;
    setIsSelect(Number(lesson_id) === lesson.id);
  }, [router.query.lesson_id]);

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
        <div
          className={`flex min-h-[40px] w-full cursor-pointer items-center ${
            isSelect ? 'border-l-[3px] border-selected' : 'border-l-[2px] border-light-border'
          } pl-[20px]`}
        >
          <p
            className={`h-full text-center text-lg ${
              isSelect ? 'font-normal' : 'font-light'
            } text-light-text-primary`}
          >
            {lesson.title}
          </p>
        </div>
      </div>
      <div
        className={`flex ${
          !isHover ? 'h-[0px]' : 'h-[40px]'
        } items-center overflow-hidden pl-[20px] `}
      >
        <div
          onClick={async () => {
            setIsHover(false);
            const call = async () => {
              const r = await CodeSmoothInstructorLessonApi.addLesson({
                section_id: lesson.section_id,
                order: lesson.order + 1,
              });
              await onAddLesson(r.data.data);
            };
            toast.promise(
              call(),
              {
                pending: 'Đang thêm bài học',
                success: 'Thêm bài học thành công!',
                error: 'Thêm bài học thất bại!',
              },
              TOAST_CONFIG,
            );
          }}
          className="flex h-[40px] items-center gap-1 px-2 transition-all hover:bg-[#f5f5f5]"
        >
          <img src={'/images/icons/plus.svg'} alt="" className="h-[15px] w-[15px]" />
          <p className="text-xs text-light-text-primary">Thêm bài học</p>
        </div>
        <div
          onClick={async () => {
            setIsHover(false);
            const call = async () => {
              const r = await CodeSmoothInstructorLessonApi.deleteLesson(lesson.id);
              if (r.status === 200) {
                await onDeletedSection(lesson.id);
              } else {
                await onDeletedSection();
              }
            };
            toast.promise(
              call(),
              {
                pending: 'Đang xóa bài học',
                success: 'Xóa bài học thành công!',
                error: 'Xóa bài học thất bại!',
              },
              TOAST_CONFIG,
            );
          }}
          className="flex h-[40px] items-center px-2 transition-all hover:bg-[#f5f5f5]"
        >
          <TrashIcon pathFill="#4C4E64" height="15px" width="15px" />
          <p className="text-xs text-light-text-primary">Xóa bài học</p>
        </div>
      </div>
    </div>
  );
}

export default LessonItem;
