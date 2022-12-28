import { Add } from '@mui/icons-material';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { useState } from 'react';

interface LessionNavItemProps {
  l: {
    id: number;
    title: string;
  };
  course_category_id: number;
  onClickLession: (lessionId: number) => void;
  onAddLessons: (categoryId: number) => void;
}

const LessionNavItem: FC<LessionNavItemProps> = (props) => {
  const [isHover, setIsHover] = useState(false);
  const router = useRouter();
  const isSelecting = router.query.lessionid === props.l.id.toString();
  return (
    <div
      key={props.l.id}
      className={`ml-2 flex h-8 items-center `}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="relative flex h-6 items-end">
        <div className="absolute bottom-3 z-0 h-14 w-7 rounded-b-full border-l-2 border-b-2 border-gray-400"></div>
        <div
          className={`z-20 ml-4 h-6 w-40 cursor-pointer rounded-normal pl-2 ${
            isSelecting ? 'bg-slate-200' : 'bg-slate-100'
          }`}
          onClick={() => props.onClickLession(props.l.id)}
        >
          {props.l.title}
        </div>
      </div>
      {isHover && (
        <div
          onClick={() => props.onAddLessons(props.course_category_id)}
          className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition  duration-200 hover:bg-slate-400 hover:bg-opacity-10 hover:text-light-primary`}
        >
          <Add style={{ fontSize: '20px' }} />
        </div>
      )}
    </div>
  );
};

export default LessionNavItem;
