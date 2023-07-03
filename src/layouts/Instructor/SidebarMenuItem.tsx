import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import type { BaseIconProps } from '../../common/Icons/Interface';

function SideBarInstructorMenuItem({
  Icon,
  text,
  badge,
  badgeText = 1,
  redirectPath,
}: {
  Icon: React.ComponentType<BaseIconProps>;
  text?: string;
  badge?: boolean;
  badgeText?: number;
  redirectPath: string;
}) {
  const [selected, setSelected] = useState(false);

  const bg = selected ? 'bg-light-primary' : 'white';
  const textClass = selected ? 'text-white' : 'text-[#2A3547]';

  const textBadgeClass = selected ? 'text-light-primary' : 'text-white';
  const bgBadgeClass = selected ? 'bg-white' : 'bg-light-primary';
  const router = useRouter();

  useEffect(() => {
    if (router.query.page?.includes(redirectPath)) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [router.query.page]);

  return (
    <Link
      href={`/instructor/${redirectPath}`}
      className={`${bg} flex cursor-pointer items-center justify-between rounded-[5px] p-[10px] ${
        !selected && 'hover:bg-light-grayDarker'
      }`}
    >
      <div className={`${bg} flex  items-center gap-4 `}>
        <Icon pathFill={`${selected ? 'white' : '#000000CC'}`} />
        <p className={`font-instructorSidebar text-base ${textClass}`}>{text}</p>
      </div>
      {badge && (
        <div
          className={`flex h-[19px] w-[19px] items-center justify-center rounded-full ${bgBadgeClass}`}
        >
          <p className={`text-xs font-bold leading-3 ${textBadgeClass}`}>{badgeText}</p>
        </div>
      )}
    </Link>
  );
}

export default SideBarInstructorMenuItem;
