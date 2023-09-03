import { useEffect, useState } from 'react';

import type { ListPostResponse } from '../../api/codedrafts-api';
import ArrowLeftIconV3 from '../../common/Icons/ArrowLeftIconV3';
import ArrowRightIconV3 from '../../common/Icons/ArrowRightIconV3 ';
import PostCard from './PostCard';

type SwiperListCardProps = {
  classSwiper: string;
  posts: ListPostResponse[];
  haveArrow?: boolean;
  slidePerView?: number | 3;
};

const SwiperListCard = ({ classSwiper, posts, haveArrow, slidePerView }: SwiperListCardProps) => {
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [isStart, setIsStart] = useState<boolean>(true);

  const handlerPrev = () => {
    const swiperEl = document.querySelector(`#${classSwiper}`) as any;
    swiperEl.swiper.slidePrev();
  };
  const handlerNext = () => {
    const swiperEl = document.querySelector(`#${classSwiper}`) as any;
    swiperEl.swiper.slideNext();
  };

  useEffect(() => {
    const swiperEl = document.querySelector(`#${classSwiper}`) as any;

    swiperEl.addEventListener('slidechange', (event) => {
      setIsStart(swiperEl.swiper.isBeginning);
      setIsEnd(swiperEl.swiper.isEnd);
    });
  }, []);

  return (
    <div className="flex w-[1400px] items-center justify-center">
      {haveArrow && (
        <ArrowLeftIconV3
          className="cursor-pointer"
          height="30"
          width="30"
          pathFill={isStart ? '#AAB3CA' : '#4D5B7C'}
          onClick={handlerPrev}
        />
      )}
      <div className="relative w-[1300px]">
        <swiper-container
          style={{
            width: '100%',
            maxWidth: '100%',
            maxHeight: '100vh',
            minHeight: 0,
            minWidth: 0,
          }}
          id={classSwiper}
          slides-per-view={3}
        >
          {posts.map((p, index) => (
            <PostCard post={p} key={index} />
          ))}
        </swiper-container>
      </div>
      {haveArrow && (
        <ArrowRightIconV3
          className="cursor-pointer"
          height="30"
          width="30"
          pathFill={isEnd ? '#AAB3CA' : '#4D5B7C'}
          onClick={handlerNext}
        />
      )}
    </div>
  );
};

export default SwiperListCard;
