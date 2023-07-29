import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { PrimaryButton } from '../Button';

const BottomOutlineNavbarButton = ({
  isSelected,
  title,
  slug,
  className,
  textSelectedColor,
  dividerSelectedColor,
  badge,
  badgeNumber,
  queryName = 'selection',
}: {
  isSelected?: boolean;
  title: string;
  slug?: string;
  className?: string;
  textSelectedColor?: string;
  dividerSelectedColor?: string;
  badge?: boolean;
  badgeNumber?: number;
  queryName?: string;
}) => {
  const router = useRouter();
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    const selection = router.query[queryName] as string;

    if (!router.isReady) return;
    setSelected(slug === decodeURIComponent(selection));
  }, [decodeURIComponent(router.query[queryName] as string) !== slug]);

  const onClickHandler = () => {
    router.replace({ href: './', query: { ...router.query, [queryName]: slug } }, undefined, {
      shallow: true,
    });
  };

  const selectedColorClass = textSelectedColor || 'text-light-primary';
  const dividerColorClass = dividerSelectedColor || 'bg-light-primary';
  return (
    <div className="z-20 cursor-pointer flex-col" onClick={onClickHandler}>
      <div className="my-[15px] flex items-center justify-center gap-[13px] px-[15px]">
        <p
          className={`${
            className || ''
          } font-lexend-deca text-[20px] font-normal capitalize  leading-[22px] ${
            selected ? selectedColorClass : 'text-[#414141]'
          }`}
        >
          {title}
        </p>
        {badge && (
          <div className="flex w-[22px] items-center justify-center rounded-[3px] bg-[#f1f1f1] px-[6.5px]">
            <p className="items-center text-[12px] font-bold leading-[20px] text-[#414141]">
              {badgeNumber}
            </p>
          </div>
        )}
      </div>

      {selected && <div className={`h-[2px] ${dividerColorClass}`} />}
    </div>
  );
};

const BottomOutlineNavbarButtonWithOutSlug = ({
  title,
  className,
  textSelectedColor,
  dividerSelectedColor,
  badge,
  badgeNumber,
  onChange,
  value,
}: {
  title: string;
  className?: string;
  textSelectedColor?: string;
  dividerSelectedColor?: string;
  badge?: boolean;
  badgeNumber?: number;
  onChange: (value: string) => void;
  value: string;
}) => {
  const selectedColorClass = textSelectedColor || 'text-light-primary';
  const dividerColorClass = dividerSelectedColor || 'bg-light-primary';
  const isSelected = value === title;
  return (
    <div
      className="z-20 cursor-pointer flex-col"
      onClick={() => {
        onChange(title);
      }}
    >
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
            <p className="items-center text-[12px] font-bold leading-[20px] text-[#757575]">
              {badgeNumber}
            </p>
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
  queryName,
}: {
  navs: {
    title: string;
    slug?: string;
    badgeNumber?: number;
    className?: string;
  }[];
  textSelectedColor?: string;
  dividerSelectedColor?: string;
  badge?: boolean;
  isInstructor?: boolean;
  queryName?: string;
}) {
  return (
    <div className="relative flex w-full items-start justify-between">
      <div className="flex">
        {navs.map((e, i) => {
          return (
            <BottomOutlineNavbarButton
              key={i}
              className={e.className}
              title={e.title}
              slug={e.slug}
              textSelectedColor={textSelectedColor}
              dividerSelectedColor={dividerSelectedColor}
              badge={badge}
              badgeNumber={e.badgeNumber}
              queryName={queryName}
            />
          );
        })}
      </div>
      {isInstructor && (
        <div className="flex items-center gap-4 pr-2">
          <img src="/images/icons/search.svg" className="cursor-pointer" alt="" />
          <Link href={`/instructor/course/course-editor`}>
            <PrimaryButton
              text="+ Tạo mới"
              className="p-[10px]"
              isOrginalPadding={false}
              textClassName="text-md font-normal text-white font-lexend-deca"
            />
          </Link>
        </div>
      )}
      <div className="absolute top-[53px] z-10 h-[1px] w-full bg-light-border" />
    </div>
  );
}

function UnderlineNavbarWithOutSlug({
  navs,
  textSelectedColor,
  dividerSelectedColor,
  badge,
  isInstructor,
  onChange,
  value,
}: {
  navs: {
    title: string;
    slug?: string;
    badgeNumber?: number;
    className?: string;
  }[];
  textSelectedColor?: string;
  dividerSelectedColor?: string;
  badge?: boolean;
  isInstructor?: boolean;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative flex w-full items-start justify-between">
      <div className="flex">
        {navs.map((e, i) => {
          return (
            <BottomOutlineNavbarButtonWithOutSlug
              key={i}
              className={e.className}
              title={e.title}
              textSelectedColor={textSelectedColor}
              dividerSelectedColor={dividerSelectedColor}
              badge={badge}
              badgeNumber={e.badgeNumber}
              onChange={onChange}
              value={value}
            />
          );
        })}
      </div>
      {isInstructor && (
        <div className="flex items-center gap-4 pr-2">
          <img src="/images/icons/search.svg" className="cursor-pointer" alt="" />
          <Link href={`/instructor/course/course-editor`}>
            <PrimaryButton
              text="+ Tạo mới"
              className="h-9 py-[8px] px-[7px]"
              textClassName="text-sm font-normal text-white font-lexend-deca"
            />
          </Link>
        </div>
      )}
      {/* <div className="absolute top-[53px] z-10 h-[1px] w-full bg-light-border" /> */}
    </div>
  );
}

export { BottomOutlineNavbarButton, UnderlineNavbar, UnderlineNavbarWithOutSlug };
