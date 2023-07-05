import { AboutCourse, CarouselHome } from '@/components/home';
import HeaderPrimary from '@/components/home/HeaderPrimary';

const Home = () => {
  return (
    <div>
      <HeaderPrimary />
      <div className=" mx-[200px] mt-[12px] flex flex-col items-center justify-center">
        <CarouselHome />
        <AboutCourse />
      </div>
    </div>
  );
};
export default Home;
