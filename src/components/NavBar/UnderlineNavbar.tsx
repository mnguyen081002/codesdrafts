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
}: {
  isSelected?: boolean;
  title: string;
  slug?: string;
  className?: string;
  textSelectedColor?: string;
  dividerSelectedColor?: string;
  badge?: boolean;
}) => {
  const router = useRouter();
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    const selection = router.query.selection as string;

    if (!router.isReady) return;
    setSelected(slug === decodeURIComponent(selection));
  }, [decodeURIComponent(router.query.selection as string) !== slug]);

  const onClickHandler = () => {
    router.replace({ href: './', query: { ...router.query, selection: slug } }, undefined, {
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
            selected ? selectedColorClass : 'text-[#757575]'
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

      {selected && <div className={`h-[2px] ${dividerColorClass}`} />}
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
    slug?: string;
    className?: string;
  }[];
  textSelectedColor?: string;
  dividerSelectedColor?: string;
  badge?: boolean;
  isInstructor?: boolean;
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
            />
          );
        })}
      </div>
      {isInstructor && (
        <div className="flex items-center gap-4 pr-2">
          <img src="/images/icons/search.svg" className="cursor-pointer" alt="" />
          <Link href={`/instructor/course/course-editor`}>
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
