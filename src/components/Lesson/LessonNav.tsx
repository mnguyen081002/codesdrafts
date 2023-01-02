import { Add, ExpandMore } from '@mui/icons-material';
import type { FC } from 'react';
import { useState } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';

import type { CategoryResponse } from '../../api/codesmooth-api';
import { CodeSmoothApi } from '../../api/codesmooth-api';
import { useAppDispatch } from '../../app/hooks';
import LessonNavItem from './LessonNavItem';

interface CategoryNavProps {
  category: CategoryResponse;
  index: number;
  onClickLesson?: (lessonId: number) => void;
  onCategoryChange?: (category: string, categoryId: number) => void;
  onAddLessons?: (categoryId: number) => void;
  onAddCategory?: () => void;
  editMode?: boolean;
}

export const CategoryNav: FC<CategoryNavProps> = (props) => {
  const [isExpand, setIsExpand] = useState(props.index === 0);
  const [isHover, setIsHover] = useState(false);
  const [isInputCategory, setIsInputCategory] = useState(false);
  const [draggable, setDraggable] = useState(false);

  const dispatch = useAppDispatch();
  const handleDoubleClick = () => {
    if (!props.editMode) {
      return;
    }
    setIsInputCategory(true);
  };
  const handleExpand = () => {
    setIsExpand(!isExpand);
  };

  const onBlur = () => {
    setIsInputCategory(false);
    CodeSmoothApi.updateCategory(props.category.title, props.category.id);
  };

  const onKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      setIsInputCategory(false);
      CodeSmoothApi.updateCategory(props.category.title, props.category.id);
    }
  };

  return (
    <div
      key={props.category.id}
      className={`flex flex-col`}
      draggable={props.editMode && draggable}
      onMouseDown={() => setDraggable(false)}
      onMouseUp={() => setDraggable(true)}
    >
      <div
        className={`z-10 flex w-full justify-between bg-light-gray py-2`}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div className="flex h-10 flex-1 items-center justify-start">
          {isHover && props.editMode ? (
            <img
              src="/icon-move.png"
              alt="icon-move"
              className="h-6 w-6 cursor-pointer rounded-full border border-slate-400 p-1"
              onMouseDown={() => setDraggable(true)}
              onMouseUp={() => setDraggable(false)}
            />
          ) : (
            <div className={`${props.editMode ? 'h-2 w-2' : 'h-5 w-5'}`} />
          )}
          {!isInputCategory ? (
            <span
              className={`flex-1 ${
                props.editMode ? 'cursor-text' : 'cursor-pointer'
              } overflow-clip whitespace-nowrap text-xl font-medium`}
              onDoubleClick={handleDoubleClick}
              onClick={() => {
                if (props.editMode) {
                  return;
                }
                handleExpand();
              }}
            >
              {props.category.title}
            </span>
          ) : (
            <ReactTextareaAutosize
              className="flex-1 resize-none rounded-md border border-black bg-white py-1 px-2 text-xl font-semibold outline-none"
              value={props.category.title}
              onChange={(e) => {
                if (props.onCategoryChange) {
                  props?.onCategoryChange(e.target.value, props.category.id);
                }
              }}
              onFocus={(e) =>
                e.currentTarget.setSelectionRange(
                  e.currentTarget.value.length,
                  e.currentTarget.value.length,
                )
              }
              autoFocus={true}
              onBlur={onBlur}
              onKeyDown={onKeyPress}
            />
          )}
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
          {isHover && props.editMode ? (
            <div
              onClick={props.onAddCategory}
              className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition duration-200 hover:bg-slate-400 hover:bg-opacity-10 hover:text-light-primary`}
            >
              <Add style={{ fontSize: '20px' }} />
            </div>
          ) : (
            <div className="h-8 w-8"></div>
          )}
        </div>
      </div>
      <div className={`flex flex-col gap-1`}>
        {isExpand &&
          props.category.lessons.map((l) => {
            return (
              <LessonNavItem
                course_category_id={props.category.id}
                l={l}
                onAddLessons={props.onAddLessons}
                onClickLesson={props.onClickLesson}
                key={l.id}
              />
            );
          })}
      </div>
    </div>
  );
};
export interface ILessonNav {
  categories?: CategoryResponse[];
  onClickLesson?: (lessonId: number) => void;
  onCategoryChange?: (category: string, categoryId: number) => void;
  onAddLessons?: (categoryId: number) => void;
  onAddCategory?: () => void;
  editMode?: boolean;
}
export const LessonNav: FC<ILessonNav> = (props) => {
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="mt-10 flex h-full flex-col gap-2">
        {props.categories?.map((category, index) => {
          return (
            <CategoryNav
              onCategoryChange={props.onCategoryChange}
              onClickLesson={props.onClickLesson}
              key={category.id}
              category={category}
              index={index}
              onAddLessons={props.onAddLessons}
              onAddCategory={props.onAddCategory}
            />
          );
        })}
      </div>
    </div>
  );
};
