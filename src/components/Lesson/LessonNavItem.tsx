import { Add } from '@mui/icons-material';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

interface LessonNavItemProps {
  l: {
    id: number;
    title: string;
  };
  course_category_id: number;
  onClickLesson?: (lessonId: number) => void;
  onAddLessons?: (categoryId: number) => void;
  editMode?: boolean;
}

const LessonNavItem: FC<LessonNavItemProps> = (props) => {
  const [isHover, setIsHover] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    setIsSelecting(router.query.lessonid === props.l.id.toString());
  }, [router.isReady, router.query.lessonid]);

  return (
    <div
      key={props.l.id}
      className={`flex items-center py-1 ${
        isSelecting ? 'bg-light-grayDarker' : 'bg-light-gray'
      } pl-2`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="relative flex min-h-[2rem] flex-row items-end">
        <div className="flex items-center">
          {props.editMode ? (
            <div className="absolute bottom-3 z-0 h-16 w-7 rounded-b-full border-l-2 border-b-2 border-black"></div>
          ) : (
            <div className="absolute left-2 h-16 w-2 border-l border-black"></div>
          )}
          <div className={`z-30 py-1 ${isSelecting ? 'bg-light-grayDarker' : 'bg-light-gray'}`}>
            <div className="h-4 w-4 rounded-full border border-black"></div>
          </div>

          <div
            className={`line-clamp-2 z-20 ml-4 flex ${props.editMode ? 'w-40' : 'w-full'} ${
              isSelecting ? 'bg-light-grayDarker' : 'bg-light-gray'
            } cursor-pointer  items-center justify-center overflow-hidden rounded-normal pl-2 `}
            onClick={() => {
              if (!props.onClickLesson) {
                return;
              }
              props.onClickLesson(props.l.id);
            }}
          >
            <span>{props.l.title}</span>
          </div>
        </div>
      </div>
      {isHover && props.editMode && (
        <div
          onClick={() => {
            if (!props.onAddLessons) {
              return;
            }
            props.onAddLessons(props.course_category_id);
          }}
          className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition  duration-200 hover:bg-slate-400 hover:bg-opacity-10 hover:text-light-primary`}
        >
          <Add style={{ fontSize: '20px' }} />
        </div>
      )}
    </div>
  );
};

export default LessonNavItem;
