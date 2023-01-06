import type { FC } from 'react';
import React from 'react';

import type { CategoryResponse } from '../../api/codesmooth-api';
import { CategoryNav } from './CategoryNav';

export interface ILessonNav {
  categories?: CategoryResponse[];
  onClickLesson?: (lessonId: number) => void;
  editMode?: boolean;
  className?: string;
}
export const LessonNav: FC<ILessonNav> = (props) => {
  return (
    <div className={`${props.className} flex flex-col overflow-y-scroll pb-10`}>
      {props.categories?.map((category, index) => {
        return (
          <CategoryNav
            editMode={props.editMode}
            onClickLesson={props.onClickLesson}
            key={category.id}
            category={category}
            index={index}
          />
        );
      })}
    </div>
  );
};
