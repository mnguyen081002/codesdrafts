import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import type { SidebarLesson } from '../../../api/base/interface/course';
import type { AddLessonResponse } from '../../../api/instructor/lesson';
import CodedraftsInstructorLessonApi from '../../../api/instructor/lesson';
import { useAppDispatch } from '../../../app/hooks';
import DoneIcon from '../../../common/Icons/DoneIcon';
import TrashIcon from '../../../common/Icons/TrashIcon';
import { setLoading } from '../../../features/auth/appSlice';
import { TOAST_CONFIG } from '../../../shared/constants/app';

function LessonItem({
  lesson,
  onAddLesson,
  onDeletedLesson,
  isLast,
  isPreview = false,
}: {
  lesson: SidebarLesson;
  onAddLesson: (r?: AddLessonResponse) => Promise<void>;
  onDeletedLesson: (lesson_id?: number) => Promise<void>;
  isLast: boolean;
  isPreview?: boolean;
}) {
  const router = useRouter();
  const [isSelect, setIsSelect] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!router.isReady) return;
    const { lesson_id } = router.query;
    setIsSelect(Number(lesson_id) === lesson.id);
  }, [router.query.lesson_id]);

  return (
    <div>
      <div
        className={`px-[10px] ${isSelect && 'bg-[#f5f5f5]'} hover:bg-[#f5f5f5]`}
        onClick={() => {
          if (router.query.lesson_id !== lesson.id.toString()) {
            router.query.lesson_id = lesson.id.toString();
            router.query.section_id = lesson.section_id.toString();
            router.replace(router);
          }
        }}
      >
        <div
          className={`flex min-h-[40px] w-full cursor-pointer items-center justify-between ${
            isSelect ? 'border-l-[3px] border-selected' : 'border-l-[2px] border-light-border'
          } pl-[10px]`}
        >
          <p className={`h-full text-start text-lg ${isSelect ? 'font-normal' : 'font-light'} `}>
            {lesson.title}
          </p>
          {lesson.is_completed && (
            <DoneIcon
              pathFill="#48AE29"
              height="14px"
              width="14"
              className={`${isSelect ? 'block' : 'hidden'}`}
            />
          )}
        </div>
      </div>
      {!isPreview && (
        <div
          className={`flex ${
            !isSelect ? 'h-[0px]' : 'h-[40px]'
          } items-center overflow-hidden pl-[20px] `}
        >
          <div
            onClick={async () => {
              dispatch(setLoading(true));
              const call = async () => {
                const r = await CodedraftsInstructorLessonApi.addLesson({
                  section_id: lesson.section_id,
                  order: lesson.order + 1,
                });
                await onAddLesson(r.data.data);
              };
              await toast.promise(
                call(),
                {
                  pending: 'Đang thêm bài học',
                  success: 'Thêm bài học thành công!',
                  error: 'Thêm bài học thất bại!',
                },
                TOAST_CONFIG,
              );
              dispatch(setLoading(false));
            }}
            className="flex h-[40px] items-center gap-1 px-2 transition-all hover:bg-[#f5f5f5]"
          >
            <img src={'/images/icons/plus.svg'} alt="" className="h-[15px] w-[15px]" />
            <p className="text-xs text-light-text-primary">Thêm bài học</p>
          </div>
          <div
            onClick={async () => {
              if (isLast) {
                toast.error('Không thể xóa bài học cuối cùng!', TOAST_CONFIG);
                toast.clearWaitingQueue();
                return;
              }
              dispatch(setLoading(true));

              const call = async () => {
                const r = await CodedraftsInstructorLessonApi.deleteLesson(lesson.id);
                if (r.status === 200) {
                  await onDeletedLesson(lesson.id);
                } else {
                  await onDeletedLesson();
                }
              };
              await toast.promise(
                call(),
                {
                  pending: 'Đang xóa bài học',
                  success: 'Xóa bài học thành công!',
                  error: 'Xóa bài học thất bại!',
                },
                TOAST_CONFIG,
              );
              dispatch(setLoading(false));
            }}
            className="flex h-[40px] items-center px-2 transition-all hover:bg-[#f5f5f5]"
          >
            <TrashIcon pathFill="#4C4E64" height="15px" width="15px" />
            <p className="text-xs text-light-text-primary">Xóa bài học</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default LessonItem;
