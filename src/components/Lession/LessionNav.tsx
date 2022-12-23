import { Add, ExpandMore } from '@mui/icons-material';
import type { FC } from 'react';
import { useState } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';

import type { CategoryResponse } from '../../api/codesmooth-api';
import { CodeSmoothApi } from '../../api/codesmooth-api';

interface CategoryNavProps {
  category: CategoryResponse;
  onClickLession: (lessionId: number) => void;
  onCategoryChange: (category: string, categoryId: number) => void;
}

export const CategoryNav: FC<CategoryNavProps> = (props) => {
  const [isExpand, setIsExpand] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isInputCategory, setIsInputCategory] = useState(false);
  const handleDoubleClick = () => {
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
    <div key={props.category.id} className="flex flex-col">
      <div
        className="z-10 mb-5 flex cursor-pointer justify-between bg-slate-100"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div className="flex flex-1 items-center justify-start gap-4">
          <img
            src="/icon-move.png"
            alt="icon-move"
            className="h-6 w-6 rounded-full border border-slate-400 p-1"
          />
          {!isInputCategory ? (
            <span
              className="flex-1 cursor-text overflow-clip text-lg font-semibold"
              onDoubleClick={handleDoubleClick}
            >
              {props.category.title}
            </span>
          ) : (
            <ReactTextareaAutosize
              className="flex-1 resize-none rounded-md border border-black bg-white py-1 px-2 text-lg font-semibold outline-none"
              value={props.category.title}
              onChange={(e) => {
                props.onCategoryChange(e.target.value, props.category.id);
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

        <div className="flex justify-start gap-1">
          <div
            className={`${
              isExpand && 'rotate-180'
            } h-10 w-10 cursor-pointer rounded-full p-1 transition duration-200 ease-in-out hover:bg-slate-400 hover:bg-opacity-10 hover:text-light-primary`}
            onClick={handleExpand}
          >
            <ExpandMore style={{ fontSize: '30px' }} />
          </div>
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full transition  duration-200 hover:bg-slate-200 hover:text-light-primary`}
          >
            <Add />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {isExpand &&
          props.category.lessions.map((l) => {
            return (
              <div key={l.id} className="ml-2 flex justify-start">
                <div className="relative flex h-6 w-48 items-end">
                  <div className="absolute bottom-3 z-0 h-11 w-7 rounded-b-full border-l-2 border-b-2 border-gray-400"></div>
                  <div
                    className="z-20 ml-4 h-6 w-40 cursor-pointer bg-slate-100 pl-3"
                    onClick={() => props.onClickLession(l.id)}
                  >
                    {l.title}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export interface ILessionNav {
  category: CategoryResponse[];
  onClickLession: (lessionId: number) => void;
  onCategoryChange: (category: string, categoryId: number) => void;
}
export const LessionNav: FC<ILessionNav> = (props) => {
  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <div className="mx-2 mt-10 flex h-full flex-col gap-6">
        {props.category.map((category) => {
          return (
            <CategoryNav
              onCategoryChange={props.onCategoryChange}
              onClickLession={props.onClickLession}
              key={category.id}
              category={category}
            />
          );
        })}
      </div>
    </div>
  );
};
