import type { FC } from 'react';

export interface CourseProps {
  title: string;
  icon: React.ReactNode;
}

export const CoureTag: FC<CourseProps> = (props) => {
  return (
    <div className="flex flex-row gap-1 rounded-normal bg-light-gray py-2 px-3 font-medium">
      {props.icon}
      {props.title}
    </div>
  );
};
