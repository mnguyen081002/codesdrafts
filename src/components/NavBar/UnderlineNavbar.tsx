import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { generateId } from '../../utils/genId';
import { PrimaryButton } from '../Button';

const BottomOutlineNavbarButton = ({
  isSelected,
  title,
  className,
  onClick,
  textSelectedColor,
  dividerSelectedColor,
  badge,
}: {
  isSelected?: boolean;
  title: string;
  className?: string;
  onClick?: () => void;
  textSelectedColor?: string;
  dividerSelectedColor?: string;
  badge?: boolean;
}) => {
  const selectedColorClass = textSelectedColor || 'text-light-primary';
  const dividerColorClass = dividerSelectedColor || 'bg-light-primary';
  return (
    <div className="z-20 cursor-pointer flex-col" onClick={onClick}>
      <div className="my-[15px] flex items-center justify-center gap-[13px] px-[15px]">
        <p
          className={`${
            className || ''
          } font-lexend-deca text-[20px] font-normal capitalize  leading-[22px] ${
            isSelected ? selectedColorClass : 'text-[#757575]'
          }`}
        >
          {title}
        </p>
        {badge && (
          <div className="flex w-[22px] items-center justify-center rounded-[3px] bg-[#f1f1f1] px-[6.5px]">
            <p className="items-center text-[12px] font-bold leading-[20px] text-[#757575]">1</p>
          </div>
        )}
      </div>

      {isSelected && <div className={`h-[2px] ${dividerColorClass}`} />}
    </div>
  );
};

function UnderlineNavbar({
  navs,
  textSelectedColor,
  dividerSelectedColor,
  badge,
  isInstructor,
}: {
  navs: {
    title: string;
    className?: string;
  }[];
  textSelectedColor?: string;
  dividerSelectedColor?: string;
  badge?: boolean;
  isInstructor?: boolean;
}) {
  const [selected, setSelected] = useState(0);
  const router = useRouter();

  return (
    <div className="relative flex w-full items-start justify-between">
      <div className="flex">
        {navs.map((e, i) => {
          return (
            <BottomOutlineNavbarButton
              key={i}
              isSelected={selected === i}
              className={e.className}
              title={e.title}
              onClick={() => setSelected(i)}
              textSelectedColor={textSelectedColor}
              dividerSelectedColor={dividerSelectedColor}
              badge={badge}
            />
          );
        })}
      </div>
      {isInstructor && (
        <div className="flex items-center gap-4 pr-2">
          <img src="/images/icons/search.svg" className="cursor-pointer" alt="" />
          <Link href={`/manage-course/course-editor/${generateId(10)}`}>
            <PrimaryButton
              text="+ Tạo Mới"
              className="h-9 py-2 px-4"
              textClassName="text-sm font-normal text-white font-lexend-deca"
            />
          </Link>
        </div>
      )}
      <div className="absolute top-[53px] z-10 h-[1px] w-full bg-light-border" />
    </div>
  );
}

export { BottomOutlineNavbarButton, UnderlineNavbar };
