import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import type { PostSeries, SeriesPost } from '../../api/codedrafts-api';
import ArrowDownV3Icon from '../../common/Icons/ArrowDownV3';

function SeriesItem({ item, index }: { item: SeriesPost; index: number }) {
  const router = useRouter();

  const isCurrent = router.query.slug === item.slug;

  return (
    <div className="flex items-center gap-[12px] border-t border-light-border p-[12px] opacity-[85%] transition-all duration-300 ease-in-out hover:opacity-100">
      <div
        className={`flex  h-[26px] w-[26px] items-center justify-center rounded-[4px] ${
          isCurrent ? 'bg-light-primary' : 'bg-[#e0e0e0]'
        }`}
      >
        <span className={`${isCurrent && 'font-bold text-white'} text-base`}>{index}</span>
      </div>
      <Link href={`/blog/${item.slug}`} className={`text-lg ${isCurrent && 'font-bold'} `}>
        {item.title}
      </Link>
    </div>
  );
}

interface SeriesProps {
  series: PostSeries;
}

function Series(props: SeriesProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  // get height of series list
  useEffect(() => {
    const wrapper = document.getElementById('wrapper');
    const seriesList = document.getElementById('series-list');
    if (!wrapper || !seriesList) return;
    if (isOpen) {
      wrapper.style.height = `${seriesList.clientHeight}px`;
    } else {
      wrapper.style.height = '0px';
    }
  }, [isOpen]);

  return (
    <div className="relative flex max-w-2xl flex-col overflow-hidden rounded-md border border-light-border">
      <div className="z-20 flex items-center justify-between bg-white p-[14px]">
        <p className="text-lg font-bold text-light-primary">
          {props.series.name} ({props.series.posts.length} phần)
        </p>
        <ArrowDownV3Icon
          className={`${
            !isOpen && '-rotate-180'
          } cursor-pointer transition-all duration-300 ease-in-out`}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
      </div>
      <div
        id="wrapper"
        className="flex flex-col justify-end overflow-hidden transition-all duration-300 ease-in-out"
      >
        <div id="series-list" className={`flex w-full flex-col justify-end`}>
          {props.series.posts.map((e, index) => {
            return <SeriesItem index={index + 1} item={e} key={index}></SeriesItem>;
          })}
        </div>
      </div>
    </div>
  );
}

export default Series;
