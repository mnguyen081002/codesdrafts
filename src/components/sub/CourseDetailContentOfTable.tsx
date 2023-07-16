import { useState } from 'react';

const h = [
  'h-[62px]',
  'h-[124px]',
  'h-[186px]',
  'h-[248px]',
  'h-[310px]',
  'h-[372px]',
  'h-[434px]',
  'h-[496px]',
  'h-[558px]',
  'h-[620px]',
  'h-[682px]',
  'h-[744px]',
  'h-[806px]',
  'h-[868px]',
  'h-[930px]',
  'h-[992px]',
  'h-[1054px]',
  'h-[1116px]',
  'h-[1178px]',
  'h-[1240px]',
  'h-[1302px]',
  'h-[1364px]',
  'h-[1426px]',
  'h-[1488px]',
  'h-[1550px]',
  'h-[1612px]',
  'h-[1674px]',
  'h-[1736px]',
  'h-[1798px]',
  'h-[1860px]',
];

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
            className="transition-all duration-300 ease-in-out"
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
        } overflow-hidden transition-all duration-300 ease-in-out`}
      >
        {contents.map((item, index) => (
          <div
            key={index}
            className="flex h-[62px] w-full items-center justify-between border-x border-b border-light-border px-6"
          >
            <p className="font-lexend-deca text-[17px] font-light leading-[22px] text-light-text-primary">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
