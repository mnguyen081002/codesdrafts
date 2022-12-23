import Button from "../common/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { WidthProgressBar } from "../utils/AppConfig";
import Link from "next/link";
import { FC } from "react";
import Skeleton from "react-loading-skeleton";

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
      href={`/editcourse/${props.id}?draft=true`}
      className="flex h-[370px] flex-col w-72 rounded transition transform hover:-translate-y-2 shadow-md hover:shadow-lg duration-500 mb-3 justify-center border border-gray-200 bg-white"
    >
      <img
        src={props.thumbnail}
        className="flex flex-row justify-between h-[40%] border-b-2"
        onError={(e) => {
          e.currentTarget.src = "/logo-96.png";
        }}
      />
      <div className="flex flex-col h-[30%] px-3 py-4 gap-2 overflow-hidden">
        <div className="flex justify-start items-center gap-2">
          <img src="/logo-96.png" alt="avatar" className="h-8 w-8 rounded-full" />
          <p className="text-sm">Code Smooth</p>
        </div>
        <p className="font-medium flex-1 text-xl ">{props.name}</p>
      </div>
      <div className="flex w-full h-[30%] px-3 items-end">
        <div className="justify-between w-full flex flex-row items-end py-4">
          <div className="flex flex-col justify-start items-center gap-2">
            <span className="text-xs">{props.completed_percent}% completed</span>
            <div className="w-[100px] h-1 bg-gray-300 rounded-full">
              <div
                className={`${
                  WidthProgressBar[props.completed_percent!]
                } h-full bg-light-primary rounded-full`}
              ></div>
            </div>
          </div>
          <Button text="Continue" icon={<ArrowForwardIcon />} />
        </div>
      </div>
    </Link>
  ) : (
    <div className="animate-pulse flex h-[370px] flex-col w-72 rounded transition transform hover:-translate-y-2 shadow-md hover:shadow-lg duration-500 mb-3 justify-center border border-gray-200 bg-white">
      <div className="h-[40%] border-b-2 bg-slate-200" />
      <div className="flex flex-col h-[70%] px-3 py-4 gap-2 justify-between">
        <div className="flex justify-start items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-slate-200" />
          <div className="w-[80%] h-8 bg-slate-200" />
        </div>
        <div className="h-24 w-full bg-slate-200" />
      </div>
      <div className="flex w-full h-[30%] px-3 items-end">
        <div className="justify-between w-full flex flex-row items-end py-4 gap-3">
          <div className="flex flex-col bg-slate-200 h-10 w-[50%] justify-start items-center gap-2"></div>
          <div className="flex flex-col bg-slate-200 h-10 w-[50%] justify-start items-center gap-2"></div>
        </div>
      </div>
    </div>
  );
};

export default SmallCourseCard;
