import { useState } from 'react';

const h = Array(30)
  .fill(null)
  .map((_, i) => `h-[${62 * (i + 1)}px]`);

interface CourseDetailContentOfTableProps {
  title: string;
  contents: string[];
}

export const CourseDetailContentOfTable = ({
  title,
  contents,
}: CourseDetailContentOfTableProps) => {
  const [isSeleted, setIsSeleted] = useState(false);
  const onClick = () => {
    setIsSeleted(!isSeleted);
  };

  return (
    <div className={`flex w-full cursor-pointer flex-col`} onClick={onClick}>
      {isSeleted ? (
        <div className="flex h-[62px] w-full items-center justify-between rounded-t-md border border-light-border bg-[#E7EFFC] px-6">
          <p className="font-lexend-deca text-[17px] font-normal leading-[22px] text-light-primary">
            {title}
          </p>
          <img
            className="transition-all duration-500 ease-in-out"
            src="/images/icons/arrow.svg"
            alt=""
          />
        </div>
      ) : (
        <div className="flex h-[62px] w-full items-center justify-between rounded-md border border-light-border px-6">
          <p className="font-lexend-deca text-[17px] font-normal leading-[22px] text-[#082A5E]">
            {title}
          </p>
          <img
            className="-rotate-180 transform transition-all duration-500 ease-in-out"
            src="/images/icons/arrow-inactive.svg"
            alt=""
          />
        </div>
      )}
      <div
        className={`${
          isSeleted ? h[contents.length - 1] : 'h-0'
        } overflow-hidden transition-all duration-500 ease-in-out`}
      >
        {contents.map((item, index) => (
          <div
            key={index}
            className="flex h-[62px] w-full items-center justify-between border-x border-b border-light-border px-6"
          >
            <p className="font-lexend-deca text-[17px] font-light leading-[22px] text-light-text-course-detail-content">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
