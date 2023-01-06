import { ExpandMore } from '@mui/icons-material';
import type { FC } from 'react';
import React, { useState } from 'react';

import type { CategoryResponse } from '../../api/codesmooth-api';
import { useAppDispatch } from '../../app/hooks';
import CategoryMoreOptions from './CategoryMoreOptions';
import LessonNavItem from './LessonNavItem';

interface CategoryNavProps {
  category: CategoryResponse;
  index: number;
  onClickLesson?: (lessonId: number) => void;
  editMode?: boolean;
}

export const CategoryNav: FC<CategoryNavProps> = (props) => {
  const [isExpand, setIsExpand] = useState(props.index === 0);
  const [isHover, setIsHover] = useState(false);

  const dispatch = useAppDispatch();

  const handleExpand = () => {
    setIsExpand(!isExpand);
  };

  return (
    <div key={props.category.id} className={`z-20 flex flex-col`} draggable={true}>
      <div
        className={`z-20 flex w-full justify-between bg-light-gray py-2`}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div className="flex h-10 flex-1 items-center justify-start">
          <div className={`${props.editMode ? 'h-6 w-6' : 'h-5 w-5'}`} />
          <span
            className={`flex-1 cursor-pointer overflow-clip whitespace-nowrap text-xl font-medium`}
            onClick={handleExpand}
          >
            {props.category.title}
          </span>
        </div>

        <div className="flex items-center justify-start">
          <div
            className={`${
              isExpand && 'rotate-180'
            } flex h-8 w-8 cursor-pointer items-center justify-center rounded-full p-1 transition duration-200 ease-in-out hover:bg-slate-400 hover:bg-opacity-10 hover:text-light-primary`}
            onClick={handleExpand}
          >
            <ExpandMore />
          </div>
          <CategoryMoreOptions
            category={props.category}
            editMode={props.editMode}
            isHoverParent={isHover}
          />
        </div>
      </div>
      <div className={`flex flex-col`}>
        {isExpand &&
          props.category.lessons.map((l) => {
            return (
              <LessonNavItem
                editMode={props.editMode}
                course_category_id={props.category.id}
                lesson={l}
                onClickLesson={props.onClickLesson}
                key={l.id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default CategoryNav;
