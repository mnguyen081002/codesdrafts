import ArrowLeftIcon from '../../common/Icons/ArrowLeftIcon';
import ArrowRightIcon from '../../common/Icons/ArrowRightIcon';
import ShortCourseCard from '../Card/ShortCourseCard';

type SwiperListCardProps = {
  classSwiper: string;
};

const SwiperListCard = ({ classSwiper }: SwiperListCardProps) => {
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
      <div className="absolute bottom-[14rem] left-[-50px] z-10 flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full bg-black">
        <ArrowLeftIcon height="30" width="30" pathFill="white" onClick={handlerPrev} />
      </div>
      <swiper-container
        id={classSwiper}
        style={{
          width: '100%',
          height: '500px',
          display: 'flex',
        }}
        slides-per-view="4"
      >
        {Array(5)
          .fill(null)
          .map((index: number) => (
            <ShortCourseCard key={index} />
          ))}
      </swiper-container>
      <div className="absolute bottom-[14rem] -right-12 z-10 flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full bg-black">
        <ArrowRightIcon height="30" width="30" pathFill="white" onClick={handlerNext} />
      </div>
    </div>
  );
};

export default SwiperListCard;
