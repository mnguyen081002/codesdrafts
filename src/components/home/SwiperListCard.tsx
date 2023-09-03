import { useEffect, useState } from 'react';

import type { ListCourseItemResponse } from '../../api/instructor/course';
import ArrowLeftIconV3 from '../../common/Icons/ArrowLeftIconV3';
import ArrowRightIconV3 from '../../common/Icons/ArrowRightIconV3 ';
import ShortCourseCard from '../Card/ShortCourseCard';

type SwiperListCardProps = {
  classSwiper: string;
  courses: ListCourseItemResponse[];
  haveArrow?: boolean;
};

const SwiperListCard = ({ classSwiper, courses, haveArrow }: SwiperListCardProps) => {
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [isStart, setIsStart] = useState<boolean>(true);

  const handlerPrev = () => {
    const swiperEl = document.querySelector(`#${classSwiper}`) as any;
    console.log(swiperEl.swiper);

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
    <div className="relative h-[540px] w-[1500px]">
      {haveArrow && (
        <ArrowLeftIconV3
          pathFill={isStart ? '#AAB3CA' : '#4D5B7C'}
          className="absolute bottom-[18rem] left-[-50px] z-10 flex h-[50px] w-[50px] cursor-pointer"
          height="30"
          width="30"
          onClick={handlerPrev}
        />
      )}
      <swiper-container id={classSwiper} slides-per-view="4">
        {courses.map((course, index) => (
          <ShortCourseCard course={course} key={index} />
        ))}
      </swiper-container>
      {haveArrow && (
        <ArrowRightIconV3
          className="absolute bottom-[18rem] -right-12 z-10 flex h-[50px] w-[50px] cursor-pointer"
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
