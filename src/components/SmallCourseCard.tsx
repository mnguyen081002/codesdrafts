import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import type { FC } from 'react';

import Button from '../common/Button';
import { WidthProgressBar } from '../utils/AppConfig';

interface SmallCourseCardProps {
  isLoading?: boolean;
  id?: number;
  name?: string;
  thumbnail?: string;
  summary?: string;
  completed_percent?: number;
  author?: string;
  author_avatar?: string;
}

const SmallCourseCard: FC<SmallCourseCardProps> = (props) => {
  return !props.isLoading ? (
    <Link
      href={`/previewcourse/${props.id}?draft=true`}
      className="mb-3 flex h-[370px] w-72 flex-col justify-center rounded border border-gray-200 bg-white shadow-md transition duration-500 hover:-translate-y-2 hover:shadow-lg"
    >
      <img
        src={props.thumbnail}
        className="flex h-[40%] flex-row justify-between border-b-2"
        alt="thumbnail"
        onError={(e) => {
          e.currentTarget.src = '/logo-96.png';
        }}
      />
      <div className="flex h-[30%] flex-col gap-2 overflow-hidden px-3 py-4">
        <div className="flex items-center justify-start gap-2">
          <img src="/logo-96.png" alt="avatar" className="h-8 w-8 rounded-full" />
          <p className="text-sm">Code Smooth</p>
        </div>
        <p className="flex-1 text-xl font-medium ">{props.name}</p>
      </div>
      <div className="flex h-[30%] w-full items-end px-3">
        <div className="flex w-full flex-row items-end justify-between py-4">
          <div className="flex flex-col items-center justify-start gap-2">
            <span className="text-xs">{props.completed_percent}% completed</span>
            <div className="h-1 w-[100px] rounded-full bg-gray-300">
              <div
                className={`${
                  WidthProgressBar[props.completed_percent!]
                } h-full rounded-full bg-light-primary`}
              ></div>
            </div>
          </div>
          <Button text="Continue" fontIcon={<ArrowForwardIcon />} />
        </div>
      </div>
    </Link>
  ) : (
    <div className="mb-3 flex h-[370px] w-72 animate-pulse flex-col justify-center rounded border border-gray-200 bg-white shadow-md transition duration-500 hover:-translate-y-2 hover:shadow-lg">
      <div className="h-[40%] border-b-2 bg-slate-200" />
      <div className="flex h-[70%] flex-col justify-between gap-2 px-3 py-4">
        <div className="flex items-center justify-start gap-2">
          <div className="h-8 w-8 rounded-full bg-slate-200" />
          <div className="h-8 w-[80%] bg-slate-200" />
        </div>
        <div className="h-24 w-full bg-slate-200" />
      </div>
      <div className="flex h-[30%] w-full items-end px-3">
        <div className="flex w-full flex-row items-end justify-between gap-3 py-4">
          <div className="flex h-10 w-[50%] flex-col items-center justify-start gap-2 bg-slate-200"></div>
          <div className="flex h-10 w-[50%] flex-col items-center justify-start gap-2 bg-slate-200"></div>
        </div>
      </div>
    </div>
  );
};

export default SmallCourseCard;
