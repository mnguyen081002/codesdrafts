import type { GetServerSideProps } from 'next';

import { CarouselHome, HomeMain } from '@/components/home';
import HeaderPrimary from '@/components/home/HeaderPrimary';
import { requireAuth } from '@/components/requireAuth';

const Home = () => {
  return (
    <div>
      <HeaderPrimary />
      <div className=" mx-[220px] mt-[12px] flex flex-col items-center justify-center">
        <CarouselHome />
        <HomeMain />
      </div>
    </div>
  );
};
export default Home;

export const getServerSideProps: GetServerSideProps = requireAuth(async () => {
  return {
    props: {},
  };
});
