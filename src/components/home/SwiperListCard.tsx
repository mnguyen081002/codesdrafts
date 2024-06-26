import type { ListCourseItemResponse } from '../../api/instructor/course';
import ArrowLeftIcon from '../../common/Icons/ArrowLeftIcon';
import ArrowRightIcon from '../../common/Icons/ArrowRightIcon';
import ShortCourseCard from '../Card/ShortCourseCard';

type SwiperListCardProps = {
  classSwiper: string;
  courses: ListCourseItemResponse[];
  haveArrow?: boolean;
};

const SwiperListCard = ({ classSwiper, courses, haveArrow }: SwiperListCardProps) => {
  const handlerPrev = () => {
    const swiperEl = document.querySelector(`#${classSwiper}`) as any;
    swiperEl.swiper.slidePrev();
  };
  const handlerNext = () => {
    const swiperEl = document.querySelector(`#${classSwiper}`) as any;
    swiperEl.swiper.slideNext();
  };
  return (
    <div className="relative w-[1500px]">
      {haveArrow && (
        <div className="absolute bottom-[14rem] left-[-50px] z-10 flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full bg-black">
          <ArrowLeftIcon height="30" width="30" pathFill="white" onClick={handlerPrev} />
        </div>
      )}
      <swiper-container
        id={classSwiper}
        style={{
          width: '100%',
          height: '500px',
          display: 'flex',
        }}
        slides-per-view="4"
      >
        {courses.map((course, index) => (
          <ShortCourseCard course={course} key={index} />
        ))}
      </swiper-container>
      {haveArrow && (
        <div className="absolute bottom-[14rem] -right-12 z-10 flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full bg-black">
          <ArrowRightIcon height="30" width="30" pathFill="white" onClick={handlerNext} />
        </div>
      )}
    </div>
  );
};

export default SwiperListCard;
